import re
import requests
import pandas as pd
import time
import random
import logging
from urllib.parse import urlencode
# from fake_useragent import UserAgent
from bs4 import BeautifulSoup
from bs4.element import ResultSet, Tag
from typing import List


from crawlers.setting import Setting
from .base_crawler import BaseCrawler

s = Setting()

class SimplyHired(BaseCrawler):
    def __init__(self, keyword):
        self.result_list = []
        self.keyword = keyword
        # self.ua = UserAgent()
        self.s3_keyword_df = s.get_csv_from_s3()
        self.platform_name = s.simplyhired_setting()['platform_name']
        self.platform_url = s.simplyhired_setting()['platform_url']
        self.query = s.simplyhired_setting()['query']
        self.referer_list = s.simplyhired_setting()['referer_list']
        self.ip_list = s.simplyhired_setting()['ip_list']
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 Edg/95.0.1020.44",
        }

    def get_job_list(self, soup: BeautifulSoup):
        print("enter get_job_list()")
        pre = soup.find('ul', id='job-list')
        if not pre:
            return None 
        return pre.find_all('div', {"class": ["SerpJob-jobCard", "card"]})
    
    def get_job_name(self, job_item: Tag) -> str:
        print("enter get_job_name()")
        parent_node = job_item.find('h3', class_='jobposting-title')
        return parent_node.find('a', {"class": ["SerpJob-link", "card-link"]}).text

    def get_job_page_link(self, job_item: Tag) -> str:
        print("enter get_job_page_link()")
        parent_node = job_item.find('h3', class_='jobposting-title')
        href = parent_node.find(
            'a', {"class": ["SerpJob-link", "card-link"]}).get('href')
        return 'https://www.simplyhired.com' + href

    def get_company_name(self, job_item: Tag) -> str:
        print("enter get_company_name()")
        node = job_item.find('span', class_="jobposting-company")
        if not node:
            return None 
        return node.text

    def get_company_page_link(self):
        return None

    def update_time(self, job_item: Tag) -> str:
        print("enter update_time()")
        parent_node = job_item.find('span', class_='SerpJob-timestamp')
        if parent_node.find('time').text == '':
            return "Recently"
        return parent_node.find('time').text


    def get_location(self, job_item: Tag) -> str:
        print("enter get_location()")
        node = job_item.find('span', class_="jobposting-location")
        if not node:
            return None
        return node.text.strip()

    def _insert_to_readme(self, data_list: List[dict], keyword: str, platform_class):
        print("enter _insert_to_readme()")
        df = pd.DataFrame(data_list).sort_values(
        ["company"]).reset_index(drop=True)
        df.index += 1
        markdown_content = "\n"
        markdown_content += f"\n#### {keyword}"
        markdown_content += "\n" + df.to_markdown()

        with open(f"./readme_{platform_class.__name__}.md", "a") as f:
            f.write(markdown_content)

    def _insert_to_csv(self, data_list: List[dict], keyword: str, platform_class):
        print("enter _insert_to_csv()")
        df = pd.DataFrame(data_list).sort_values(
            ["company"]).reset_index(drop=True)
        df.insert(0, 'platform', platform_class.__name__)
        df.insert(1, 'keyword', keyword)
        df.index += 1
        csv_content = df.to_csv(index=False, header=None)
        with open(f"./csv_{platform_class.__name__}.csv", "a") as f:
            f.write(csv_content)
    
    # def _insert_to_json(self, data_list: List[dict], keyword: str, platform_class):
    #     df = pd.DataFrame(data_list).sort_values(
    #         ["company"]).reset_index(drop=True)
    #     df.index += 1
    #     json_data = df.to_json(orient = "records", lines=True)
    #     json_data.encode('utf8').decode('utf8')
    #     with open(f"./{platform_class.__name__}.json", "a", encoding="utf8") as f:
    #         f.write(json_data)
    
    def fetch_request(self, platform_class):
        print("enter fetch_request()")
        self.query['q'] = self.keyword
        url = self.platform_url + urlencode(self.query)
        print(url)

        logging.info(f'Now Processing: {url}')
        # logging.info(f'Page: {page}, {self.keyword}')
        print(f'Now Processing: {url}')
        # print(f'Page: {self.keyword}, {page}')

        resp = requests.get(
            url=url, headers=self.headers)
        soup = BeautifulSoup(resp.text, 'html.parser')
        result = self.get_job_list(soup)

        # 如果沒抓到 job list 頁面就略過這次 url
        if not result:
            logging.error(f'FAIL, no result when crawling this url: {url}')
            logging.info(f'Break here, now go to next loop(next page)')
            return None
        for job_item in result:
            # print(job_item)
            job_name = self.get_job_name(job_item)
            job_page_link = self.get_job_page_link(job_item)
            company_name = self.get_company_name(job_item)
            # company_page_link = self.get_company_page_link(job_item)
            update_time = self.update_time(job_item)
            location = self.get_location(job_item)
            print('=================')
            # print(job_name, job_page_link)
            print('-----------------')
            # print(company_name, company_page_link, update_time, location)

            job_dict = {
                'company': company_name,
                'company_name': company_name,
                'company_page_link': 'None',
                'job': f'[{job_name}]({job_page_link})',
                'job_name': job_name,
                'job_page_link': job_page_link,
                'update_time': update_time,
                'location': location,
            }
            print("finished one job_dict;")
            print(job_dict)
            self.result_list.append(job_dict)

        logging.info(f'====Finished Processing====: {self.keyword}')
        print(f'====Finished Processing====: {self.keyword}')

        df = pd.DataFrame(self.result_list)
        logging.info(f'====Sending data to CSV file====: {self.keyword}')
        print(f'====Sending data to CSV file====: {self.keyword}')
        # df.to_csv('simplyhired.csv')
        self._insert_to_csv(self.result_list, self.query['q'], platform_class)
        logging.info(
            f'====Finished Sending data to CSV file====: {self.keyword}')
        print(f'====Finished Sending data to CSV file====: {self.keyword}')

        logging.info(f'====Sending data to readme====: {self.keyword}')
        print(f'====Sending data to readme====: {self.keyword}')
        self._insert_to_readme(
            self.result_list, self.query['q'], platform_class)
        logging.info(
            f'====Finished Sending data to readme====: {self.keyword}')
        print(f'====Finished Sending data to readme====: {self.keyword}')

        # self._insert_to_json(self.result_list, self.query['q'], platform_class)

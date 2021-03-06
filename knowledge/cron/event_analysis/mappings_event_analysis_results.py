# -*-coding:utf-8-*-

import sys
import json
import pinyin
from elasticsearch import Elasticsearch
from elasticsearch.helpers import scan
reload(sys)
sys.path.append('../../')
from global_utils import es_event as es
from global_config import event_analysis_name,event_type

def mappings_event_analysis_results():

	index_info = {
		'settings':{
			'number_of_replicas':0,
			'number_of_shards':5,
			"analysis": {
				"analyzer": {
					"my_analyzer": {
						"type": "pattern",
						"pattern": "&"
					}
				}
			}
		},
		'mappings':{
			event_type:{
				'properties':{
					"name":{
						"type":"string",
						"index": "not_analyzed"
					},
					"real_geo":{
						"analyzer": "my_analyzer",
						"type": "string"
					},
					"real_time":{
						"type":"string",
						"index": "no"
					},
					"event_type":{
						"type":"string",
						"index": "not_analyzed"
					},
					"real_person":{
						"analyzer": "my_analyzer",
						"type": "string"
					},
					"real_auth":{
						"analyzer": "my_analyzer",
						"type": "string"
					},
					"work_tag":{
						"analyzer": "my_analyzer",
						"type": "string"
					},
					"description":{
						"index": "not_analyzed",
						"type": "string"
					},
					"weibo_counts": {
						"type": "long"
					},
					"uid_counts": {
						"type": "long"
					},
					"related_docs":{
						"index": "no",
						"type": "string"
					},
					"time_results":{
						"index": "no",
						"type": "string"
					},
					"geo_results":{
						"index": "no",
						"type": "string"
					},
					"sentiment_results":{
						"index": "no",
						"type": "string"
					},
					"user_results":{
						"index": "no",
						"type": "string"
					},
					"keywords":{
						"analyzer": "my_analyzer",
						"type": "string"
					},
					"hashtag":{
						"analyzer": "my_analyzer",
						"type": "string"
					},
					"keywords_list":{
						"index": "no",
						"type": "string"
					},
					"hashtag_dict":{
						"index": "no",
						"type": "string"
					},
					"topics":{
						"index": "not_analyzed",#"analyzer": "my_analyzer",
						"type": "string"
					},
					"en_name": {
						"index": "not_analyzed",
						"type": "string"
					},
					"start_ts": {
						"type": "long"
					},
					"end_ts": {
						"type": "long"
					},
					"submit_user": {
						"index": "not_analyzed",
						"type": "string"
					},
					"compute_ts": {
						"type": "long"
					},
					"submit_ts": {
						"type": "long"
					},
					"compute_status": {
						"type": "long"
					},
					"mid": {
						"type": "long"
					},
					"first_compute":{
						"type":"long"
					},
					"immediate_compute":{
						"type":"long"
					},
					"recommend_style":{
					    'type':'string'
					}
				}
			}

		}

	}


	if not es.indices.exists(index=event_analysis_name):

		print es.indices.create(index=event_analysis_name,body=index_info,ignore=400)

	return '1'


if __name__ == "__main__":

	mappings_event_analysis_results()
	# a = es.get(index='event_result',doc_type='text',id='xiang-gang-qian-zong-du-qian-ze-liang-you-er-ren-1482126431')['_source']['time_results']
	# print json.loads(a)
	# print type(json.loads(a))


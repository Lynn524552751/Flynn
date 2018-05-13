// ==UserScript==
// @name            Flynn-Test
// @namespace       https://github.com/Lynn524552751/Flynn
// @version      	0.0.1
// @author          Flynn
// @license      	MIT
// @date         	26/03/2018
// @description     Test
// @match           *://www.baidu.com/*
// @require         http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @version         0.0.1
// @grant        	GM_xmlhttpRequest
// ==/UserScript==

function getURL_GM(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(response) {
            if (response.status >= 200 && response.status < 400)
                callback(response.responseText);
            else
                console.log('Error getting ' + url + ': ' + response.statusText);
        },
        onerror: function(response) {
            console.log('Error during GM_xmlhttpRequest to ' + url + ': ' + response.statusText);
        }
    });
}

function getJSON_GM(url, callback) {
    getURL_GM(url, function(data) {
        callback(JSON.parse(data));
    });
}

function translator(){
	if(card_CN.length>0 && card_EN.length>0){
		console.log("translator");
		$("span.card-name").each(function (i,val){
		if(/^[a-zA-Z]/.test($(val).html())){
			$.each(cards, function(idx, obj) {
				if($(val).html() == obj["en_name"]){
					console.log(obj["en_name"]);
					$(val).html(obj["name"]);		
				}
			});
		}
	}
	
}

var card_CN = [];
var card_EN = [];

var timer = setInterval(function(){
		translator();
	},1000);


(function () {
    'use strict';
    //
    console.log("Init");
    getJSON_GM('https://api.hearthstonejson.com/v1/latest/zhCN/cards.collectible.json', function (data) {
        		card_CN = data;
                console.log(card_CN[0]);
            });
    getJSON_GM('https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json', function (data) {
        		card_EN = data;
                console.log(card_EN[0]);
            });
})();


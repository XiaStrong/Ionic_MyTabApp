angular.module('starter.services', [])

    .factory('Status', function () {
        var params = {
            'bluetoothTypeSelected': [{'deviceName': "森", 'deviceType': "1"}, {'deviceName': "卡", 'deviceType': "2"}]
        }

        return {

            getParams: function () {
                return params;
            },
        }
    })

    .factory('Account', function (appItfService) {

        var params = {

            "applications": [],
            "more": true

        }

        return {

            getParams: function () {
                return params;
            },

            getInfo: function (param) {
                return appItfService.do_getInfo_resp(param);
            },

            //删除某一行
            remove: function (app) {
                params.applications.splice(params.applications.indexOf(app), 1);
            },


            get: function (name) {
                console.log(name);
                console.log(params.applications.length);
                for (var i = 0; i < params.applications.length; i++) {
                    var dic = params.applications[i];
                    if (dic.name === name) {
                        console.log("有");

                        return dic;
                    }
                }
                return null;
            }
        }
    })

    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {

                console.log(parseInt(chatId));

                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });

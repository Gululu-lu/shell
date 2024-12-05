var http = require('http');
var url = require('url');
var mysql = require('mysql');
const querystring = require('querystring');

// 创建数据库连接
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0077',
    database: 'test'
});

// 连接数据库
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database with thread ID ' + connection.threadId);
});
//书籍信息
var books = [
    {
        id: 1,
        title: '大狗',
        image: '../novel_01.jpg',
        author: '常小琥',
        price: '$58.00'
    },
    {
        id: 2,
        title: '梦游人',
        image: '../novel_02.jpg',
        author: '[奥]赫尔曼·布洛赫',
        price: '218.00'
    },
    {
        id: 3,
        title: '凛冬之罪',
        image: '../novel_03.jpg',
        author: '岳勇',
        price: '59.00'
    },
    {
        id: 4,
        title: '羊道',
        image: '../novel_04.jpg',
        author: '李娟',
        price: '55.00'
    },
    {
        id: 5,
        title: '阿勒泰的角落',
        image: '../literature_01.jpg',
        author: '李娟',
        price: '59'
    },
    {
        id: 6,
        title: '活着',
        image: '../literature_02.jpg',
        author: '余华',
        price: '20.00'
    },
    {
        id: 7,
        title: '太白金星有点烦',
        image: '../literature_03.jpg',
        author: '马伯庸',
        price: '45.00'
    },
    {
        id: 8,
        title: '我与地坛',
        image: '../literature_04.jpg',
        author: '史铁生',
        price: '23.00'
    },
    {
        id: 9,
        title: '钟表馆事件',
        image: '../illation_01.jpg',
        author: '[日] 绫辻行人',
        price: '35.00'
    },
    {
        id: 10,
        title: '孤岛的来访者',
        image: '../illation_02.jpg',
        author: '[日] 方丈贵惠',
        price: '49.00'
    },
    {
        id: 11,
        title: '消失的13级台阶',
        image: '../illation_03.jpg',
        author: '[日] 高野和明',
        price: '42.00'
    },
    {
        id: 12,
        title: '第七重解答',
        image: '../illation_04.jpg',
        author: '[法] 保罗·霍尔特',
        price: '23.00'
    },
    {
        id: 13,
        title: '意识上传中',
        image: '../science_01.jpg',
        author: '[澳] 格雷格·伊根',
        price: '56'
    },
    {
        id: 14,
        title: '地球尽头的温室',
        image: '../science_02.jpg',
        author: '金草叶',
        price: '49'
    },
    {
        id: 15,
        title: '星之继承者',
        image: '../science_03.jpg',
        author: '[英] 詹姆斯·P.霍根',
        price: '58.00'
    },
    {
        id: 16,
        title: '科幻逃离未来4',
        image: '../science_04.jpg',
        author: '(日) 小林泰三',
        price: '56.00'
    },
    {
        id: 17,
        title: '人与神圣',
        image: '../history_01.jpg',
        author: '[法] 罗杰·卡约瓦',
        price: '69.00'
    },
    {
        id: 18,
        title: '三国前夜',
        image: '../history_02.jpg',
        author: '张向荣',
        price: '89.80'
    },
    {
        id: 19,
        title: '清人社会生活',
        image: '../history_03.jpg',
        author: '冯尔康 / 常建华',
        price: '98.00'
    },
    {
        id: 20,
        title: '云南禄村',
        image: '../history_04.jpg',
        author: '[加] 宝森',
        price: '138.00'
    },
    {
        id: 21,
        title: '弗吉尼亚·伍尔夫传',
        image: '../biography_01.jpg',
        author: '[英] 林德尔·戈登',
        price: '88'
    },
    {
        id: 22,
        title: '契科夫传',
        image: '../biography_02.jpg',
        author: '[英]唐纳德·雷菲尔德',
        price: '178.00'
    },
    {
        id: 23,
        title: '巨流河',
        image: '../biography_03.jpg',
        author: '齐邦媛',
        price: '39.00'
    },
    {
        id: 24,
        title: '一次告别',
        image: '../biography_04.jpg',
        author: '[哥伦比亚] 罗德里戈·加西亚',
        price: '49.00'
    }
];

// 创建 HTTP 服务器
var app = http.createServer(function (req, res) {
    const url_obj = url.parse(req.url, true);

    // 设置允许跨域的域名和方法
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 处理 OPTIONS 预检请求
    if (req.method === 'OPTIONS') {
        console.log('Received OPTIONS request');
        res.writeHead(200);
        res.end();
        return;
    }


    // 处理注册请求
    if (url_obj.pathname === '/register' && req.method === 'POST') {
        console.log('Received POST request to /register');

        let post_data = "";
        req.on('data', function (chunk) {
            post_data += chunk;
        });

        req.on('end', function () {
            try {
                console.log('Request data:', post_data);
                const post_obj = JSON.parse(post_data);

                const sql = "INSERT INTO user_info(user_Name, user_Password, user_Email) VALUES (?, ?, ?)";
                const values = [
                    post_obj.user_Name,
                    post_obj.user_Password,
                    post_obj.user_Email
                ];

                connection.query(sql, values, function (error, result) {
                    if (error) {
                        console.error('Error inserting data into database:', error);
                        res.writeHead(500);
                        res.end(JSON.stringify({ status: false, error: "Database error" }));
                        return;
                    }

                    console.log('Database insert result:', result);
                    if (result && result.affectedRows > 0) {
                        res.writeHead(200);
                        res.end(JSON.stringify({ status: true }));
                    } else {
                        res.writeHead(200);
                        res.end(JSON.stringify({ status: false }));
                    }
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.writeHead(400);
                res.end(JSON.stringify({ status: false, error: "Invalid JSON format" }));
            }
        });
    }
    //检查用户名
    else if (url_obj.pathname === '/checkUsername' && req.method === 'GET') {
        console.log('Received GET request to /checkUsername');

        const username = url_obj.query.username;

        const sql = "SELECT * FROM user_info WHERE user_Name = ?";
        connection.query(sql, [username], function (error, results) {
            if (error) {
                console.error('Error querying database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ exists: false, error: "Database error" }));
                return;
            }

            if (results.length > 0) {
                res.writeHead(200);
                res.end(JSON.stringify({ exists: true }));
            } else {
                res.writeHead(200);
                res.end(JSON.stringify({ exists: false }));
            }
        });
    }

    // 处理登录请求
    else if (url_obj.pathname == '/login' && req.method === 'POST') {
        console.log('Received POST request to /login');

        let post_data = "";
        req.on('data', function (chunk) {
            post_data += chunk;
        });

        req.on('end', function () {
            try {
                console.log('Request data:', post_data);
                const post_obj = JSON.parse(post_data);

                const sql = "SELECT * FROM user_info WHERE user_Name = ? AND user_Password = ?";
                const values = [post_obj.username, post_obj.password];

                connection.query(sql, values, function (error, results) {
                    if (error) {
                        console.error('Error querying database:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, error: "Database error" }));
                        return;
                    }

                    if (results.length > 0) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, error: "Invalid username or password" }));
                    }
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: "Invalid JSON format" }));
            }
        });
    }

    // 处理获取用户信息请求
    else if (url_obj.pathname === '/api/user' && req.method === 'GET') {
        const username = url_obj.query.username; // 直接从查询参数获取用户名
        
        if (username) {
            console.log(`Received GET request to /api/user with username: ${username}`);
          
            var sql = "SELECT * FROM user_info WHERE user_Name = ?";
            connection.query(sql, [username], (error, results) => {
              if (error) {
                console.error('Error querying database:', error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Database error" }));
                return;
              }
          
              if (results.length > 0) {
                res.writeHead(200);
                res.end(JSON.stringify(results[0]));
              } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: "User not found" }));
              }
            });
        } else {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Invalid request or missing username parameter" }));
        }
    }
    // 处理更新用户信息请求
    else if (url_obj.pathname === '/api/user/update' && req.method === 'PUT') {
        console.log('Received PUT request to /api/user/update');
    
        let post_data = '';
        req.on('data', function (chunk) {
            post_data += chunk;
        });
    
        req.on('end', function () {
            try {
                console.log('Request data:', post_data);
                const post_obj = JSON.parse(post_data);
    
                const sql = "UPDATE user_info SET user_Name = ?, user_Password = ?, user_Email = ?, user_Gender = ?, user_BirthDate = ?, user_Location = ? WHERE user_id = ?";
                const values = [
                    post_obj.user_Name,
                    post_obj.user_Password,
                    post_obj.user_Email,
                    post_obj.user_Gender,
                    post_obj.user_BirthDate,
                    post_obj.user_Location,
                    post_obj.user_id // 假设有一个用户ID用于标识要更新的用户
                ];
    
                connection.query(sql, values, function (error, result) {
                    if (error) {
                        console.error('Error updating data into database:', error);
                        res.writeHead(500);
                        res.end(JSON.stringify({ status: false, error: "Database error" }));
                        return;
                    }
    
                    console.log('Database update result:', result);
                    if (result && result.affectedRows > 0) {
                        // 更新成功后重新获取用户信息并响应给客户端
                        fetchUserInfo(post_obj.user_Name); // 假设传入的是用户名或其他标识符
    
                        res.writeHead(200);
                        res.end(JSON.stringify({ status: true }));
                    } else {
                        res.writeHead(200);
                        res.end(JSON.stringify({ status: false }));
                    }
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.writeHead(400);
                res.end(JSON.stringify({ status: false, error: "Invalid JSON data" }));
            }
        });
    }
    
    

    // 处理搜索图书请求
    else if (url_obj.pathname === '/api/books' && req.method === 'GET') {
        const searchQuery = url_obj.query.search;
        console.log('Received GET request to /api/books with search query:', searchQuery);

        if (!searchQuery) {
            console.log('No search query provided');
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Missing search query" }));
            return;
        }

        // 解码查询参数，确保能够正确匹配
        const decodedQuery = decodeURIComponent(searchQuery);

        // 简单的查询逻辑：查找标题中包含搜索词的图书
        const results = books.filter(book => book.title.includes(decodedQuery));
        console.log('Search results:', results);

        res.writeHead(200);
        res.end(JSON.stringify(results));
    }

    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// 启动 HTTP 服务器，监听端口 2000
app.listen(2000, function () {
    console.log('Server is running on http://localhost:2000');
});

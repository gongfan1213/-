1.浏览器发起请求，请求建立webSocket链接
GET ws /chat HTTP/1.1
http请求头，url以ws:开头
Host:localhost:8080
Upgrade: websocket
升级为websocket协议
Connection: Upgrade
链接，协议升级
Connection: Upgrade
Sec-WebSocket-Key: 1234567890
Sec-WebSocket-Version: 13
Set-websocket-key: client-random-string

2.服务端响应
HTTP/1.1 101 Switching Protocols
http响应头
Upgrade: websocket
Sec-WebSocket-Accept: 1234567890
websocket都是建立在tcp协议的基础之上的，所以服务器端也容易实现，不同的语言都支持的
tcp是全双工协议，http协议基于他的，但是设计成了单向的协议

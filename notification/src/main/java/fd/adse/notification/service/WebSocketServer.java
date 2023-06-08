package fd.adse.notification.service;

import javax.websocket.OnMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/websocket/{userId}")
@Component
public class WebSocketServer {

    private static NotificationService notificationService;

    @Autowired
    public void setUserService(NotificationService notificationService){
        WebSocketServer.notificationService=notificationService;
    }

    public static ConcurrentHashMap<Long, WebSocketServer> getWebSocketMap() {
        return webSocketMap;
    }

    /**
     * 用来存放每个客户端对应的 WebSocketServer 对象
     */
    private static final ConcurrentHashMap<Long, WebSocketServer> webSocketMap = new ConcurrentHashMap<>();

    /**
     * 与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    private Session session;

    /**
     * 接收 userId
     */
    private Long userId;

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("userId") Long userId) {
        this.session = session;
        this.userId = userId;
        webSocketMap.remove(userId);
        webSocketMap.put(userId, this);
        System.out.println(notificationService);
        List<String> msgs = notificationService.getUnprocessedMsg(userId);
        if (msgs != null){
            for (String msg:msgs){
                try {
                    sendMessage(msg);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }
    /*
     测试使用
     */
    @OnMessage
    public void onMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText("server recv success: " + message);
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        webSocketMap.remove(userId);
    }


    /**
     * 发生错误时调用
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

    /**
     * 实现服务器主动推送
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    public static void sendToUser(Long userId, String msg) throws IOException {
        if(webSocketMap.containsKey(userId)){
            webSocketMap.get(userId).sendMessage(msg);
        }
    }
}
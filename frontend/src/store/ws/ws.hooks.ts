import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {useEffect, useState} from "react";
import {createSocket} from "./ws.slice.ts";
import {Message, MessageType} from "../../models";
import {addMessage, editMessage, EditMessageParams, removeMessage, useStoreMessages} from "../messages";
import {setOnlineOfflineUserChat, useGetChatQuery, useStoreChats, useStoreCurrentChat} from "../chats";
import {Callback, useCurrentChat, useNotification, useUpdateChat} from "../../utils";
import {Socket} from "socket.io-client";
import {addOnlineUser, removeUserFromOnline, useCurrentStoreUser} from "../users";
import {clearToken} from "../auth";

export const useSocket = () => {
  return useAppSelector(state => state.ws.socket);
}
export const useCreateSocket = () => {
  const dispatch = useAppDispatch();
  const user = useCurrentStoreUser();

  useEffect(() => {
    dispatch(createSocket());
  }, [user]);
}
export const useSetSocketName = (name?: string): void => {
  const socket = useSocket();

  useEffect(() => {
    if (!name) return;
    socket?.emit('set-name', {name});
  }, [name, socket]);
}
export const useSendMessageToSocket = (message: Message, cb: Callback): void => {
  const socket = useSocket();

  useEffect(() => {
    if (!message) return;
    socket?.emit('send-message', message);
    typeof cb === 'function' && cb();
  }, [message, socket]);
}
export const useUpdateMessageSocket = (cb?: Callback): () => void => {
  const socket = useSocket();

  const send = (message: Message): void => {
    if(!socket || !message) return;
    socket.emit('update-message', message);
    typeof cb === 'function' && cb();
  }

  return send;
}
export const useDeleteMessageSocket = (cb?: Callback) : () => void => {
  const socket = useSocket();

  const dell = (message: Message) => {
    if(!socket || !message) return;
    socket.emit('delete-message', message);
    typeof cb === 'function' && cb();
  }

  return dell;
}
export const useGetMessage = () => {
  const socket = useSocket();

  useGetMessage_Sender(socket);
  useGetMessage_Updater(socket);
  useGetMessage_Deleter(socket);
}
export const useChatUpdate = () => {
  const [reqChat, setReqChat] = useState<String | null>(null);
  useUpdateChat(reqChat)
  return setReqChat;
}
export const useGetMessage_Sender = (socket: Socket) => {
  const chat = useStoreCurrentChat();
  const user = useCurrentStoreUser();
  const dispatch = useAppDispatch();
  const generateNotification = useNotification();

  const setReqChat = useChatUpdate();

  useEffect(() => {
    socket?.removeListener('message');
    socket?.addEventListener('message', (message: Message) => {
      if (!message || !chat) return;
      const ch = (message?.iduserto === chat && chat !== user.id) ? message?.iduserto : message?.iduserfrom;
      chat && setReqChat(new String(ch));

      if (
        (chat === message.iduserfrom && user.id === message.iduserto) ||
        (chat === message.iduserto && user.id === message.iduserfrom)
      ) {
        return dispatch(addMessage(message))
      }

      if(message.iduserfrom === user.id) return;
      generateNotification();
    })
  }, [socket, chat, user])
}
export const useGetMessage_Updater = (socket: Socket) => {
  const chat = useStoreCurrentChat();
  const dispatch = useAppDispatch();

  const setReqChat = useChatUpdate();

  useEffect(() => {
    socket?.addEventListener('update-message', (message: Message) => {
      if(!message) return;

      const ch = message?.iduserto === chat ? message?.iduserto : message?.iduserfrom;
      chat && setReqChat(new String(ch));

      dispatch(editMessage({
        messageid: message.messageid,
        newValue: message.message
      }));
    })
  }, [chat, socket]);
}
export const useGetMessage_Deleter = (socket: Socket) => {
  const chat = useStoreCurrentChat();
  const dispatch = useAppDispatch();

  const setReqChat = useChatUpdate();

  useEffect(() => {
    socket?.addEventListener('delete-message', (message: Message) => {
      if(!message) return;

      const ch = message?.iduserto === chat ? message?.iduserto : message?.iduserfrom;
      chat && setReqChat(new String(ch));

      dispatch(removeMessage(message.messageid));
    })
  }, [chat, socket]);
}
export const useOnlineChecker = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const chats = useStoreChats();
  const getOnlineUsers = useGetOnlineUsers();

  useEffect(() => {
    if(socket == null || !chats) return;
    socket.removeListener('user-online');
    socket.removeListener('user-offline');

    socket.addEventListener('user-online', (userid: string) => {
      const args = {userid, isOnline: true};
      dispatch(setOnlineOfflineUserChat(args));
      dispatch(addOnlineUser(userid));
    });
    socket.addEventListener('user-offline', (userid: string) => {
      const args = {userid, isOnline: false};
      dispatch(setOnlineOfflineUserChat(args));
      dispatch(removeUserFromOnline(userid));
    })

    getOnlineUsers();
  }, [chats]);
}

export const useGetOnlineUsers = () => {
  const socket = useSocket();
  return () => socket.emit('get-online-users');
}

export const useUserDeleteHandler = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket?.removeListener('delete-user');
    socket?.addEventListener('delete-user', () => {
      alert('Ваш аккаунт был удален администратором!');
      dispatch(clearToken());
    })
  }, [socket]);
}

export const useUserBlockHandler = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket?.removeListener('block-user');
    socket.addEventListener('block-user', (reason: string) => {
      alert(`Ваш аккаунт заблокирован. Причина: ${reason}`);
      dispatch(clearToken());
    })
  }, [socket]);
}
import {io, Socket} from "socket.io-client";
import {createSlice} from "@reduxjs/toolkit";

export interface WsState {
  socket: Socket | null
}

const initialState : WsState = {
  socket: null
}

export const SOCKET_URL = 'ws://localhost:3002';

export const wsSlice = createSlice({
  name: 'ws-slice',
  initialState,
  reducers: {
    createSocket(state: WsState) {
      state.socket = io(SOCKET_URL);
    },
    disposeSocket(state: WsState) {
      state.socket?.disconnect();
    }
  }
})

export const { createSocket, disposeSocket} = wsSlice.actions;
export const wsReducer = wsSlice.reducer;
import { useReducer } from 'react';
import { match } from 'ts-pattern';
import { ChatRoomResponse, ChatRoomAlertType, ChatPubAlert } from '@/api/@types/Chat';

export type ChatRoomAlertAction = {
  type: ChatRoomAlertType;
  data?: ChatPubAlert;
  forceUpdateValues?: ChatRoomResponse[];
};

type State = {
  rooms: ChatRoomResponse[];
};

const reducer = (state: State, action: ChatRoomAlertAction): State => {
  return (
    match(action)
      // 새로운 메시지를 수신했을 때
      .with({ type: ChatRoomAlertType.MESSAGE }, ({ data }) => {
        if (!data) return state;
        const targetIdx = state.rooms.findIndex(r => r.reservationSummary.id === data.reservationId);
        const results = [...state.rooms];
        const row = { ...state.rooms[targetIdx] };
        results[targetIdx] = {
          ...row,
          latestChat: {
            ...row.latestChat,
            message: data.message,
          },
          count: row.count + 1,
        };

        return { rooms: results };
      })
      // 상대로부터 채팅방이 생성되었을 때
      .with({ type: ChatRoomAlertType.CREATION }, ({ data }) => {
        if (!data?.chatRoomSummary) return state;
        return {
          rooms: [data.chatRoomSummary, ...state.rooms],
        };
      })
      // 내부 로직에서 상태를 업데이트해야할 때
      .with({ type: ChatRoomAlertType.FORCE_UPDATE }, ({ forceUpdateValues }) => {
        if (!forceUpdateValues) return state;
        return {
          rooms: forceUpdateValues,
        };
      })
      .otherwise(() => state)
  );
};

const useChatRoomReducer = () => {
  const [state, dispatch] = useReducer(reducer, { rooms: [] });
  return { state, dispatch };
};

export default useChatRoomReducer;

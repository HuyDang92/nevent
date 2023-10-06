import { AnyAction, Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';

function isPayloadAction(payload: unknown): payload is {
  data: Object;
  status: number;
} {
  return payload !== undefined;
}

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  //   console.log(action.payload);

  //   if(isRejectedWithValue(action)) {

  //   }
  return next(action);
};

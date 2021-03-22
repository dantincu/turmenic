import { Subject } from "rxjs";

import { AppTestMsg } from "../../app/appMessagesSlice";

export interface AppMessagesCntrProps {
  $appTestMsgSubject: Subject<AppTestMsg>;
}

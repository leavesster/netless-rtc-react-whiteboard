import * as React from "react";
import {Room, RoomState} from "white-react-sdk";
import "./WhiteboardBottomLeft.less";
import ScaleController from "@netless/react-scale-controller";
import * as player from "../../assets/image/player.svg";
import * as like_icon from "../../assets/image/like_icon.svg";
import {Tooltip} from "antd";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {push} from "@netless/i18n-react-router";
import {netlessWhiteboardApi} from "../../apiMiddleware";
import {isMobile} from "react-device-detect";

export type WhiteboardBottomLeftInnerProps = {
    room: Room;
    roomState: RoomState;
    uuid: string;
    userId: string;
};

export type WhiteboardBottomLeftProps = RouteComponentProps<{}> & WhiteboardBottomLeftInnerProps;

class WhiteboardBottomLeft extends React.Component<WhiteboardBottomLeftProps, {}> {

    private zoomChange = (scale: number): void => {
        const {room} = this.props;
        room.zoomChange(scale);
    }

    public render(): React.ReactNode {
        const {roomState} = this.props;
        const time = netlessWhiteboardApi.user.getStartTimestamp();
        const end = netlessWhiteboardApi.user.getEndTimestamp();
        if (isMobile) {
            return (
                <div className="whiteboard-box-bottom-left">
                    {/*<ScaleController zoomScale={roomState.zoomScale} zoomChange={this.zoomChange}/>*/}
                    <div
                        onClick={async () => {
                            await this.props.room.disconnect();
                            if (time && end) {
                                const duration = (parseInt(end) - parseInt(time));
                                push(this.props.history, `/replay/${this.props.uuid}/${this.props.userId}/${time}/${duration}`);
                            } else if (time) {
                                push(this.props.history, `/replay/${this.props.uuid}/${this.props.userId}/${time}/`);
                            } else {
                                push(this.props.history, `/replay/${this.props.uuid}/${this.props.userId}/`);
                            }
                        }}
                        className="whiteboard-box-bottom-left-player">
                        <img src={player}/>
                    </div>
                    {/*<div*/}
                        {/*onClick={async () => {*/}
                            {/*this.props.room.dispatchMagixEvent("handclap", "handclap");*/}
                        {/*}}*/}
                        {/*className="whiteboard-box-bottom-left-cell">*/}
                        {/*<img style={{width: 15}} src={like_icon}/>*/}
                    {/*</div>*/}
                </div>
            );
        } else {
            return (
                <div className="whiteboard-box-bottom-left">
                    <ScaleController zoomScale={roomState.zoomScale} zoomChange={this.zoomChange}/>
                    <Tooltip placement="top" title={"回放"}>
                        <div
                            onClick={async () => {
                                await this.props.room.disconnect();
                                if (time && end) {
                                    const duration = (parseInt(end) - parseInt(time));
                                    push(this.props.history, `/replay/${this.props.uuid}/${this.props.userId}/${time}/${duration}`);
                                } else if (time) {
                                    push(this.props.history, `/replay/${this.props.uuid}/${this.props.userId}/${time}/`);
                                } else {
                                    push(this.props.history, `/replay/${this.props.uuid}/${this.props.userId}/`);
                                }
                            }}
                            className="whiteboard-box-bottom-left-player">
                            <img src={player}/>
                        </div>
                    </Tooltip>
                    <div
                        onClick={async () => {
                            this.props.room.dispatchMagixEvent("handclap", "handclap");
                        }}
                        className="whiteboard-box-bottom-left-cell">
                        <img style={{width: 15}} src={like_icon}/>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(WhiteboardBottomLeft);

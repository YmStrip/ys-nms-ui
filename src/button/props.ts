import {EventLayerProps} from "../event-layer/props";

export type ButtonProps = {
	size: number
	event: EventLayerProps
	//颜色
	color?: string
	//back颜色
	back?: string
	padding?: string
	margin?: string
	//active颜色
	activeBack?: string
	activeColor?: string
	active?: boolean
	
	//hoverBack颜色
	hoverBack?: string
	hoverColor?: string
	//左边栏
	borderLeft?: string
	hoverBorderLeft?: string
	borderRight?: string
	hoverBorderRight?: string
	borderTop?: string
	hoverBorderTop?: string
	borderBottom?: string
	hoverBorderBottom?: string
	contentStyle?: any
	contentClass?: any
	style?: any
	class?: any
}

import {a} from "vitest/dist/reporters-2ff87305";

class create {
	name: string
	init (name:string=Math.random().toString(36).substr(2)) {
		this.name = name
		NEventBus.bus[name] = this
		return this
	}
	unInit () {
		delete NEventBus.bus[this.name]
		return this
	}
	ons:Record<string, any[]> = {}
	on (name:string,f:any) {
		if (!this.ons[name]) this.ons[name] = []
		this.ons[name].push(f)
		if (!NEventBus.mapBus[name]) NEventBus.mapBus[name] = []
		NEventBus.mapBus[name].push(f)
		return this
	}
	delOn (name:string,f:any) {
		let o = this.ons[name]
		if (o) {
			for (let i = 0, l = o.length;i<l; ++i) {
				if (o[i]==f) {
					o.splice(i,1)
					break
				}
			}
		}
		let q = NEventBus.mapBus[name]
		if (q) {
			for (let i = 0, l = q.length;i<l; ++i) {
				if (q[i]==f) {
					q.splice(i,1)
					break
				}
			}
		}
		return this
	}
}
export const NEventBus = new class {
	bus:Record<string, create> = {}
	mapBus: Record<string, any[]> = {}
	emit (name:string,...data) {
		for (let i of (this.mapBus[name]||[])) {
			i(...data)
		}
	}
	//绑定全局事件
	create = create
}
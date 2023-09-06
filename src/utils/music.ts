import defaultHoverMusic from "./assets/button-hover.mp3"
import defaultClickMusic from "./assets/button-click.mp3"
export const MusicUtils = new class {
	playSound (src,time=2000) {
		const doc = document.createElement('audio')
		const playbackRate = Math.random() * (2 - 0.3) + 0.3; // 在0.7到1.3之间生成随机数
		doc.playbackRate = playbackRate;
		doc.src = src
		document.body.appendChild(doc)
		
		setTimeout(()=>{
			doc.play()
		})
		setTimeout(()=>{
			doc.remove()
		},time)
	}
	playHover (src?) {
		this.playSound(src||defaultHoverMusic)
	}
	playClick (src?) {
		this.playSound(src||defaultClickMusic)
	}
}
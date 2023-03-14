import html from "../../dist/web/spaceid/index.html?raw"
import type { pluginMessage, actHandles } from "../type"
;(globalThis as any).reearth.ui.show(html, { width: 312, height: 44 })

const updateTheme = () => {
  ;(globalThis as any).reearth.ui.postMessage({
    act: "setTheme",
    payload: {
      theme: (globalThis as any).reearth.widget.property.customize?.theme,
      overriddenTheme: {
        colors: {
          background: (globalThis as any).reearth.widget.property.customize
            ?.backgroundColor,
          primary: (globalThis as any).reearth.widget.property.customize
            ?.primaryColor,
        },
      },
    },
  })
}

const handles: actHandles = {
  resize: (size: any) => {
    ;(globalThis as any).reearth.ui.resize(...size)
  },
  getTheme: () => {
    updateTheme()
  },
  getUrl: () => {
    const layers = (globalThis as any).reearth.layers.layers
    console.log("layers re-earth", layers)
    const url = (globalThis as any).reearth.widget.property.default?.spaceUrl
    console.log("url re-earth", url)
    ;(globalThis as any).reearth.ui.postMessage({
      act: "setUrl",
      payload: url,
    })
  },
  getTags: () => {
    const tags = (globalThis as any).reearth.layers.selected?.tags
    console.log("tags re-earth: ", tags)
    ;(globalThis as any).reearth.ui.postMessage({
      act: "setTags",
      payload: tags,
    })
  },
}
;(globalThis as any).reearth.camera.flyTo({
  lng: 139.753985797606674,
  lat: 35.6306738560138,
  height: 1000,
})
;(globalThis as any).reearth.on("message", (msg: pluginMessage) => {
  if (msg?.act) {
    handles[msg.act]?.(msg.payload)
  }
})
;(globalThis as any).reearth.on("update", () => {
  updateTheme()
  handles.getUrl?.()
  handles.getTags?.()
})

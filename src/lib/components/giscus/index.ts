export function setGiscusTheme(theme: string) {
    let giscus = document.querySelector('giscus-widget')
    if (giscus?.shadowRoot) {
      let iframe = giscus.shadowRoot.querySelector('iframe') as HTMLIFrameElement
      if (iframe?.contentWindow) {
        let message = {
          setConfig: {
            theme: theme,
          },
        }
        iframe.contentWindow.postMessage(
          { giscus: message },
          'https://giscus.app'
        )
      }
    }
  }
  
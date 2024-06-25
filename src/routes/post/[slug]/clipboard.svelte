<script lang="ts">
  import { onMount } from 'svelte'

  onMount(() => {
    const copyBtnElement = document.querySelectorAll('.copy')

    const copyBtnSucess = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
      `

    function copyToClipboard(event: Event) {
      const buttonElement = event.currentTarget as HTMLButtonElement
      const codeTitleElement = buttonElement.parentElement

      const copyBtnDefault = buttonElement.innerHTML
      buttonElement.innerHTML = copyBtnSucess

      const text = codeTitleElement?.nextElementSibling?.textContent
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          buttonElement.classList.add('animate-ping')

          setTimeout(() => {
            buttonElement.classList.remove('animate-ping')
            buttonElement.innerHTML = copyBtnDefault
          }, 600)
        })
      }
    }

    copyBtnElement.forEach((btn) => {
      btn.addEventListener('click', copyToClipboard)
    })

    return () =>
      copyBtnElement.forEach((btn) =>
        btn.removeEventListener('click', copyToClipboard)
      )
  })
</script>

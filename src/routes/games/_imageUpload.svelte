<script lang="ts">
  import { createEventDispatcher } from "svelte"

  import { uploadImage } from "$lib/db"

  export let height = 213
  export let width = 160
  export let src = ""

  const dispatch = createEventDispatcher()

  let file: any

  function input(event) {
    file = event.target.files[0]
    
    if (isFileImage()) drawImageOnCanvas()
  }

  function isFileImage() {
    if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg") return true
    return false
  }

  function drawImageOnCanvas() {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = event => {
      const image = new Image()
      image.src = event.target.result.toString()

      image.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        canvas.width = width
        canvas.height = height

        const coverSize = resizeToFill(
          image.naturalWidth,
          image.naturalHeight,
          canvas.width,
          canvas.height
        )

        ctx.drawImage(
          image,
          coverSize.offsetLeft,
          coverSize.offsetTop,
          coverSize.width,
          coverSize.height
        )

        ctx.canvas.toBlob(blob => {
          const filename =  Math.random().toString(36).substring(2, 15) + ".jpeg"
          const renderedImage = new File([blob], filename, {
            type: "image/jpeg",
            lastModified: Date.now()
          })

          console.log(renderedImage)

          src = URL.createObjectURL(renderedImage)

          upload(renderedImage, filename)
        }, "image/jpeg", .8)
      }
    }
  }

  function resizeToFill(contentWidth: number, contentHeight: number, containerWidth: number, containerHeight: number, offsetLeft = 0.5, offsetTop = 0.5) {
    const contentRatio: number = contentWidth / contentHeight
    const containerRatio: number = containerWidth / containerHeight
    let resultHeight: number
    let resultWidth: number

    if (contentRatio > containerRatio) {
      resultHeight = containerHeight
      resultWidth = containerHeight * contentRatio
    } else {
      resultWidth = containerWidth
      resultHeight = containerWidth / contentRatio
    }

    return {
      width: resultWidth,
      height: resultHeight,
      offsetLeft: (containerWidth - resultWidth) * offsetLeft,
      offsetTop: (containerHeight - resultHeight) * offsetTop
    }
  }

  async function upload(blob: any, filename: string) {
    try {
      const image = await uploadImage(blob, filename)
      dispatch("upload", { image })
    } catch(error) {
      console.log(error)
      alert(error.message)
    }
  }
</script>



{ #if src }
  <div class="mt-1/2">
    <img {src} { width } { height } alt="preview" />
  </div>
{ /if }

<label class="button { src ? "mt-1/4" : "mt-1/2" }">
  { src ? "Change" : "Upload" } image

  <input type="file" on:change={ input } />
</label>



<style lang="scss">
  label {
    white-space: nowrap;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    opacity: 0;
  }
</style>

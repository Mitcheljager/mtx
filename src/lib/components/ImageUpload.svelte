<script>
	import { uploadImage } from "$lib/db"

	/** @type {{height?: number, width?: number, src?: string, onComplete?: function}} */
	let { height = 213, width = 160, src = $bindable(""), onComplete = (image) => image } = $props();

	let file

	function input(event) {
		file = event.target.files[0]

		if (isFileImage()) drawImageOnCanvas()
	}

	function isFileImage() {
		if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")
			return true
		return false
	}

	function drawImageOnCanvas() {
		const reader = new FileReader()
		reader.readAsDataURL(file)

		reader.onload = (event) => {
			const image = new Image()
			image.src = event?.target?.result?.toString() || ""

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

				ctx.canvas.toBlob(
					(blob) => {
						const filename = Math.random().toString(36).substring(2, 15) + ".jpeg"
						const renderedImage = new File([blob], filename, {
							type: "image/jpeg",
							lastModified: Date.now()
						})

						src = URL.createObjectURL(renderedImage)

						upload(renderedImage, filename)
					},
					"image/jpeg",
					0.8
				)
			}
		}
	}

	function resizeToFill(
		contentWidth,
		contentHeight,
		containerWidth,
		containerHeight,
		offsetLeft = 0.5,
		offsetTop = 0.5
	) {
		const contentRatio = contentWidth / contentHeight
		const containerRatio = containerWidth / containerHeight
		let resultHeight
		let resultWidth

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

	async function upload(blob, filename) {
		try {
			const image = await uploadImage(blob, filename)
			onComplete(image)
		} catch (error) {
			console.log(error)
			alert(error.message)
		}
	}
</script>

{#if src}
	<div class="mt-1/2">
		<img {src} {width} {height} alt="preview" />
	</div>
{/if}

<label class="button {src ? 'mt-1/4' : 'mt-1/2'}">
	{src ? "Change" : "Upload"} image

	<input type="file" onchange={input} />
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

	img {
		width: auto;
	}
</style>

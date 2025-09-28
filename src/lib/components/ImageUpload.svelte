<script lang="ts">
	import { uploadImage } from "$lib/db";

	interface Props { height?: number, width?: number, src?: string, onComplete: Function }

	let { height = 213, width = 160, src = $bindable(""), onComplete = (image: any) => image }: Props = $props();

	function input(event: Event): void {
	  const target = event.target as HTMLInputElement;
	  const file: File | null = target.files?.[0] || null;

	  if (file && isFileImage(file)) drawImageOnCanvas(file);
	}

	function isFileImage(file: File): boolean {
	  if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg") return true;
	  return false;
	}

	function drawImageOnCanvas(file: File): void {
	  const reader = new FileReader();
	  reader.readAsDataURL(file);

	  reader.onload = (event) => {
	    const image = new Image();
	    image.src = event?.target?.result?.toString() || "";

	    image.onload = () => {
	      const canvas = document.createElement("canvas");
	      const ctx = canvas.getContext("2d");

	      if (!ctx) return;

	      canvas.width = width;
	      canvas.height = height;

	      const coverSize = resizeToFill(
	        image.naturalWidth,
	        image.naturalHeight,
	        canvas.width,
	        canvas.height
	      );

	      ctx.drawImage(
	        image,
	        coverSize.offsetLeft,
	        coverSize.offsetTop,
	        coverSize.width,
	        coverSize.height
	      );

	      ctx.canvas.toBlob(
	        (blob) => {
	          const filename = Math.random().toString(36).substring(2, 15) + ".jpeg";
	          const renderedImage = new File([blob as BlobPart], filename, {
	            type: "image/jpeg",
	            lastModified: Date.now()
	          });

	          src = URL.createObjectURL(renderedImage);

	          upload(renderedImage, filename);
	        },
	        "image/jpeg",
	        0.8
	      );
	    };
	  };
	}

	function resizeToFill(
	  contentWidth = 0,
	  contentHeight = 0,
	  containerWidth = 0,
	  containerHeight = 0,
	  offsetLeft = 0.5,
	  offsetTop = 0.5
	): { width: number, height: number, offsetLeft: number, offsetTop: number } {
	  const contentRatio = contentWidth / contentHeight;
	  const containerRatio = containerWidth / containerHeight;
	  let resultHeight;
	  let resultWidth;

	  if (contentRatio > containerRatio) {
	    resultHeight = containerHeight;
	    resultWidth = containerHeight * contentRatio;
	  } else {
	    resultWidth = containerWidth;
	    resultHeight = containerWidth / contentRatio;
	  }

	  return {
	    width: resultWidth,
	    height: resultHeight,
	    offsetLeft: (containerWidth - resultWidth) * offsetLeft,
	    offsetTop: (containerHeight - resultHeight) * offsetTop
	  };
	}

	async function upload(blob: File, filename: string): Promise<void> {
	  try {
	    const image = await uploadImage(blob, filename);
	    onComplete(image);
	  } catch (error: any) {
	    console.log(error);
	    alert(error?.message);
	  }
	}
</script>

{#if src}
	<div class="mt-1/2">
		<img {src} {width} {height} alt="preview" />
	</div>
{/if}

<label class="button {src ? "mt-1/4" : "mt-1/2"}">
	{src ? "Change" : "Upload"} image

	<input type="file" onchange={input} accept="image/png, image/jpeg, image/jpg" />
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

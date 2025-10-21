<script setup lang="ts">
    import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';

    const props = defineProps({
        vectors: {
            type: Array<any>,
            required: true,
        }
    })

    const canvasWidth = ref(350);
    const canvasHeight = ref(350);
    const canvasRef = useTemplateRef("canvas");

    const GRID_LINES_COUNT = 500;
    const MIN_SCALE = 5;
    const MAX_SCALE = 50;
    
    let isPanning = false;
    
    let lastPanX = 0,
        lastPanY = 0,
        
        offsetX = 50,
        offsetY = 300,
        
        scale = 30;

    function graphToCanvas(x: number, y: number) {
      return {
        x: x * scale + offsetX,
        y: -y * scale + offsetY
      };
    }

    function drawVector(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: string) {
      const start = graphToCanvas(startX, startY);
      const end = graphToCanvas(endX, endY);
      
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2;

      // Линия вектора
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      // Стрелка
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      const arrowLength = 10;
      
      ctx.beginPath();
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(
        end.x - arrowLength * Math.cos(angle - Math.PI / 6),
        end.y - arrowLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        end.x - arrowLength * Math.cos(angle + Math.PI / 6),
        end.y - arrowLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }


    function drawGrid(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        const step = 1;
        const pixelsPerUnit = scale;
        
        for (let x = -GRID_LINES_COUNT; x <= GRID_LINES_COUNT; x += step) {
            const canvasX = x * pixelsPerUnit + offsetX;
            ctx.beginPath();
            ctx.moveTo(canvasX, 0);
            ctx.lineTo(canvasX, canvasHeight.value);
            ctx.stroke();
        }
        
        // Горизонтальные линии
        for (let y = -GRID_LINES_COUNT; y <= GRID_LINES_COUNT; y += step) {
            const canvasY = -y * pixelsPerUnit + offsetY;
            ctx.beginPath();
            ctx.moveTo(0, canvasY);
            ctx.lineTo(canvasWidth.value, canvasY);
            ctx.stroke();
        }
        
        // Оси координат
        ctx.strokeStyle = '#9aafcb';
        ctx.lineWidth = 2;
        
        // Ось X
        ctx.beginPath();
        ctx.moveTo(0, offsetY);
        ctx.lineTo(canvasWidth.value, offsetY);
        ctx.stroke();
        
        // Ось Y
        ctx.beginPath();
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX, canvasHeight.value);
        ctx.stroke();
        
        ctx.restore();
    }

    // Основная функция отрисовки
    function drawVectors() {
        if (!canvasRef || !canvasRef.value) return;
        
        const ctx = canvasRef.value.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
        
        drawGrid(ctx);

        for (const vector of props.vectors) {
            drawVector(ctx, vector.startX, vector.startY, vector.endX, vector.endY, vector.color);
        }
    }

    function startPan(event: MouseEvent) {
        isPanning = true;
        lastPanX = event.offsetX;
        lastPanY = event.offsetY;
    }

    function pan(event: MouseEvent) {
        if (!isPanning) return;
        
        const deltaX = event.offsetX - lastPanX;
        const deltaY = event.offsetY - lastPanY;
        
        offsetX += deltaX;
        offsetY += deltaY;
        
        lastPanX = event.offsetX;
        lastPanY = event.offsetY;
        
        drawVectors();
    }

    function endPan() {
        isPanning = false;
    }

    // Масштабирование
    function zoom(event: WheelEvent) {
        event.preventDefault();
        const zoomIntensity = 0.1;
        const wheel = event.deltaY < 0 ? 1 : -1;
        const zoom = Math.exp(wheel * zoomIntensity);
        
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        
        // Масштабирование относительно положения мыши
        const worldMouseX = (mouseX - offsetX) / scale;
        const worldMouseY = -(mouseY - offsetY) / scale;
        
        scale = Math.max(Math.min(scale * zoom, MAX_SCALE), MIN_SCALE);
        
        offsetX = mouseX - worldMouseX * scale;
        offsetY = mouseY + worldMouseY * scale;
        
        drawVectors();
    }

    onMounted(() => {
        drawVectors();

        window.addEventListener("mouseup", endPan)
    });

    watch(props, () => {
        console.log("watch");
        drawVectors();
    })

    onUnmounted(() => {
        window.removeEventListener("mouseup", endPan)
    })
</script>

<template>
    <section class="bg-white w-full max-w-[390px] p-5 rounded-2xl border-1 border-[#E2E8F0] grid gap-3">
        <span class="text-xl color-title-100 font-bold">График</span>

        <div class="rounded-2xl border-1 border-[#E2E8F0] h-[350px]">
            <canvas 
                ref="canvas" 
                :width="canvasWidth" 
                :height="canvasHeight"
                @mousedown="startPan"
                @mousemove="pan"
                @mouseup="endPan"
                @wheel="zoom">
            </canvas>
        </div>
    </section>
</template>
import type { Plugin } from "vue";

const icons = import.meta.glob("../assets/icons/**/*.svg", { as: "raw", eager: true });
export const SvgIconsPlugin: Plugin = {
    install(app) {
        app.config.globalProperties.$icon = (path: string) => {
            const icon: any = icons[`../assets/icons/${path}.svg`];
            return icon
        };
    },
}
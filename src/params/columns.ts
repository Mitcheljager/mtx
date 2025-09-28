import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = (param: string) => new RegExp("(slug|id)").test(param);

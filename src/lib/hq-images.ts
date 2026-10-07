import rentgen from "@/assets/diag/rentgen.jpg";
import kt from "@/assets/diag/kt.jpg";
import uzi from "@/assets/diag/uzi.jpg";
import ekg from "@/assets/diag/ekg.jpg";
import holter from "@/assets/diag/holter.jpg";
import ehokg from "@/assets/diag/ehokg.jpg";
import endoskopiya from "@/assets/diag/endoskopiya.jpg";
import dyhatelny from "@/assets/diag/dyhatelny.jpg";
import laboratoriya from "@/assets/diag/laboratoriya.jpg";
import kolposkopiya from "@/assets/diag/kolposkopiya.jpg";
import spirometriya from "@/assets/diag/spirometriya.jpg";
import obshchaya from "@/assets/surg/obshchaya-hirurgiya.jpg";
import urologiya from "@/assets/surg/urologiya.jpg";
import ginekologiya from "@/assets/surg/ginekologiya.jpg";
import travmatologiya from "@/assets/surg/travmatologiya.jpg";
import proktologiya from "@/assets/surg/proktologiya.jpg";
import mammologiya from "@/assets/surg/mammologiya.jpg";
import flebologiya from "@/assets/surg/flebologiya.jpg";

/** Фото разделов диагностики (по slug). */
export const DIAGNOSTIC_IMAGES: Record<string, string> = {
  rentgen, kt, uzi, ekg, holter, "ehokg-doppler": ehokg, endoskopiya,
  "dyhatelny-test": dyhatelny, "laboratornaya-diagnostika": laboratoriya,
  videokolposkopiya: kolposkopiya, spirometriya,
};

/** Фото направлений хирургии высокого качества (по slug). */
export const SURGERY_IMAGES: Record<string, string> = {
  "obshchaya-hirurgiya": obshchaya, urologiya, ginekologiya, travmatologiya,
  proktologiya, mammologiya, flebologiya,
};

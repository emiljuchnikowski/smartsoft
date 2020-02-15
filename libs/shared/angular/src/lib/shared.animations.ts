import { createAnimation } from '@ionic/core';

export function modalFromBottomEnterAnimation(
  AnimationC: any,
  baseEl: HTMLElement
): Promise<any> {
  const baseAnimation = createAnimation();

  const backdropAnimation = createAnimation();
  backdropAnimation.addElement(baseEl.querySelector("ion-backdrop"));

  const wrapperAnimation = createAnimation();
  wrapperAnimation.addElement(baseEl.querySelector(".modal-wrapper"));

  wrapperAnimation
    .beforeStyles({ opacity: 1 })
    .fromTo("translateY", "100%", "0%");

  backdropAnimation.fromTo("opacity", 0.01, 0.4);

  return Promise.resolve(
    baseAnimation
      .addElement(baseEl)
      .easing("cubic-bezier(0.36,0.66,0.04,1)")
      .duration(400)
      .beforeAddClass("show-modal")
      .addAnimation(backdropAnimation)
      .addAnimation(wrapperAnimation)
  );
}

export function modalFromBottomLeaveAnimation(
  AnimationC: any,
  baseEl: HTMLElement
): Promise<any> {
  const baseAnimation = createAnimation();

  const backdropAnimation = createAnimation();
  backdropAnimation.addElement(baseEl.querySelector("ion-backdrop"));

  const wrapperAnimation = createAnimation();
  const wrapperEl = baseEl.querySelector(".modal-wrapper");
  wrapperAnimation.addElement(wrapperEl);
  const wrapperElRect = wrapperEl ? wrapperEl.getBoundingClientRect() : null;

  wrapperAnimation
    .beforeStyles({ opacity: 1 })
    .fromTo("translateY", "0%", `${window.innerHeight - wrapperElRect.top}px`);

  backdropAnimation.fromTo("opacity", 0.4, 0.0);

  return Promise.resolve(
    baseAnimation
      .addElement(baseEl)
      .easing("ease-out")
      .duration(250)
      .addAnimation(backdropAnimation)
      .addAnimation(wrapperAnimation)
  );
}

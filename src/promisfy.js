export const dispatchEvent = (o, e) => {
   return new Promise((resolve, reject) => {
      e.detail.then = { resolve, reject };
      o.dispatchEvent(e);
   });
};

export const rangeSliderMax = () => {
  const rangeSlider = document.getElementById("range-slider");
  const input0 = document.getElementById("input-0");
  const input1 = document.getElementById("input-1");
  const inputs = [input0, input1];
  noUiSlider.create(rangeSlider, {
    start: [500, 100000],
    connect: true,
    range: {
      min: 500,
      max: 100000,
    },
  });
  rangeSlider.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });
  inputs.forEach((input, i) => {
    input.addEventListener("change", function () {
      i === 0
        ? rangeSlider.noUiSlider.set([input.value, null])
        : rangeSlider.noUiSlider.set([null, input.value]);
    });
  });
};

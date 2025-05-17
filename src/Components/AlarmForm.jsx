import React, { useState, useEffect } from "react";
import Select from "react-select";
import { createAlarm, getAlarmCreationData, getMakeModels, getStateCities } from "../services/api";

const toPersianDigits = (str) => str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const hardcodedPrices = [
  ...Array.from({ length: 20 }, (_, i) => {
    const value = 50000000 + i * 50000000; // 50M to 1B
    const million = value / 1000000;
    return {
      value,
      label: `${toPersianDigits(million)} میلیون تومان`,
    };
  }),
  ...[1250, 1500, 1750, 2000, 2500, 3000, 4000].map((million) => ({
    value: million * 1000000,
    label: `${toPersianDigits(million)} میلیون تومان`,
  })),
];

const hardcodedYears = [
  ...Array.from({ length: 1404 - 1366 + 1 }, (_, i) => {
    const year = 1366 + i;
    return { value: year, label: toPersianDigits(year) };
  }),
  ...Array.from({ length: 2026 - 1980 + 1 }, (_, i) => {
    const year = 1980 + i;
    return { value: year, label: toPersianDigits(year) };
  }),
];

const hardcodedDurations = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  return { value: month, label: `${toPersianDigits(month)} ماه` };
});

const hardcodedMileage = [50000, 100000, 150000, 200000, 250000, 300000].map((km) => ({
  value: km,
  label: `${toPersianDigits(km.toLocaleString())} کیلومتر`,
}));

const mapItemsFromAPI = (items) => {
  return items?.map((item) => ({
    value: item.id,
    label: item.title,
  }));
};

const AlarmForm = () => {
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);
  const [minMileage, setMinMileage] = useState(null);
  const [maxMileage, setMaxMileage] = useState(null);
  const [minInsuranceDuration, setMinInsuranceDuration] = useState(null);
  const [maxInsuranceDuration, setMaxInsuranceDuration] = useState(null);
  const [color, setColor] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [chassisState, setChassisState] = useState([]);
  const [engineState, setEngineState] = useState([]);
  const [bodyState, setBodyState] = useState([]);
  const [gearbox, setGearbox] = useState([]);

  const [filteredMaxPrices, setFilteredMaxPrices] = useState([]);
  const [filteredMaxYears, setFilteredMaxYears] = useState([]);
  const [filteredMaxMileage, setFilteredMaxMileage] = useState([]);
  const [filteredMaxDurations, setFilteredMaxDurations] = useState([]);

  // These would come from backend
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [chassisStates, setChassisStates] = useState([]);
  const [engineStates, setEngineStates] = useState([]);
  const [bodyStates, setBodyStates] = useState([]);
  const [gearboxes, setGearboxes] = useState([]);

  useEffect(() => {
    getAlarmCreationData().then((data) => {
      setStates(mapItemsFromAPI(data.states));
      setMakes(mapItemsFromAPI(data.makes));
      setColors(mapItemsFromAPI(data.colors));
      setFuelTypes(mapItemsFromAPI(data.fuelTypes));
      setChassisStates(mapItemsFromAPI(data.chassisStates));
      setEngineStates(mapItemsFromAPI(data.engineStates));
      setBodyStates(mapItemsFromAPI(data.bodyStates));
      setGearboxes(mapItemsFromAPI(data.gearboxes));
    });
  }, []);

  useEffect(() => {
    setCity(null);
    setCities([]);
    if (!state?.value) return;
    getStateCities(state?.value).then((data) => {
      setCities(mapItemsFromAPI(data));
    });
  }, [state?.value]);

  useEffect(() => {
    setModel(null);
    setModels([]);
    if (!make?.value) return;
    getMakeModels(make?.value).then((data) => {
      setModels(mapItemsFromAPI(data));
    });
  }, [make?.value]);

  useEffect(() => {
    const min = minPrice?.value || 0;
    const filtered = hardcodedPrices.filter((item) => item.value > min);
    setFilteredMaxPrices(filtered);
  }, [minPrice]);

  useEffect(() => {
    const min = minYear?.value || 0;
    const filtered = hardcodedYears.filter((item) => item.value >= min);
    setFilteredMaxYears(filtered);
  }, [minYear]);

  useEffect(() => {
    const min = minMileage?.value || 0;
    const filtered = hardcodedMileage.filter((item) => item.value > min);
    setFilteredMaxMileage(filtered);
  }, [minMileage]);

  useEffect(() => {
    const min = minInsuranceDuration?.value || 0;
    const filtered = hardcodedDurations.filter((item) => item.value > min);
    setFilteredMaxDurations(filtered);
  }, [minInsuranceDuration]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      stateId: state?.value,
      cityId: city?.value,
      makeId: make?.value,
      modelId: model?.value,
      minPrice: minPrice?.value || null,
      maxPrice: maxPrice?.value || null,
      minYear: minYear?.value || null,
      maxYear: maxYear?.value || null,
      minMileage: minMileage?.value || null,
      maxMileage: maxMileage?.value || null,
      minInsuranceDuration: minInsuranceDuration?.value || null,
      maxInsuranceDuration: maxInsuranceDuration?.value || null,

      colorIds: color.map((item) => item.value),
      fuelTypeIds: fuelType.map((item) => item.value),
      chassisStateIds: chassisState.map((item) => item.value),
      engineStateIds: engineState.map((item) => item.value),
      bodyStateIds: bodyState.map((item) => item.value),
      gearboxIds: gearbox.map((item) => item.value),
    };

    console.log("Alarm data:", data);
    createAlarm(data)
      .then((response) => {
        console.log(response);
        alert("هشدار ثبت شد!");
      })
      .catch((error) => {
        console.error(error);
        alert("هشدار ثبت نشد!", error?.response?.data?.message);
      });
  };

  const selectProps = {
    isClearable: true,
    noOptionsMessage: () => "موردی یافت نشد",
    classNamePrefix: "react-select",
    styles: {
      control: (base) => ({ ...base, direction: "rtl", textAlign: "right" }),
      menu: (base) => ({ ...base, direction: "rtl", textAlign: "right", zIndex: 9999 }),
      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      multiValue: (base) => ({
        ...base,
        backgroundColor: "#d0e9ff", // 🌟 light blue background
      }),
      multiValueLabel: (base) => ({
        ...base,
        color: "#003f7f", // optional: darker blue label text
      }),
    },
  };

  return (
    <form className="alarm-form" onSubmit={handleSubmit}>
      <label>استان</label>
      <Select options={states} value={state} onChange={setState} placeholder="انتخاب استان" {...selectProps} />

      <label>شهر</label>
      <Select options={cities} value={city} onChange={setCity} placeholder="انتخاب شهر" {...selectProps} />

      <label>برند</label>
      <Select options={makes} value={make} onChange={setMake} placeholder="انتخاب برند" {...selectProps} />

      <label>مدل</label>
      <Select options={models} value={model} onChange={setModel} placeholder="انتخاب مدل" {...selectProps} />

      <label>حداقل قیمت</label>
      <Select
        options={hardcodedPrices}
        value={minPrice}
        onChange={setMinPrice}
        placeholder="مثلاً ۵۰ میلیون"
        {...selectProps}
      />

      <label>حداکثر قیمت</label>
      <Select
        options={filteredMaxPrices}
        value={maxPrice}
        onChange={setMaxPrice}
        placeholder="مثلاً ۵۰۰ میلیون"
        {...selectProps}
      />

      <label>حداقل سال</label>
      <Select
        options={hardcodedYears}
        value={minYear}
        onChange={setMinYear}
        placeholder="مثلاً ۱۳۹۵"
        {...selectProps}
      />

      <label>حداکثر سال</label>
      <Select
        options={filteredMaxYears}
        value={maxYear}
        onChange={setMaxYear}
        placeholder="مثلاً ۱۴۰۳"
        {...selectProps}
      />

      <label>حداقل کارکرد</label>
      <Select
        options={hardcodedMileage}
        value={minMileage}
        onChange={setMinMileage}
        placeholder="مثلاً ۵۰,۰۰۰"
        {...selectProps}
      />

      <label>حداکثر کارکرد</label>
      <Select
        options={filteredMaxMileage}
        value={maxMileage}
        onChange={setMaxMileage}
        placeholder="مثلاً ۲۰۰,۰۰۰"
        {...selectProps}
      />

      <label>رنگ بدنه</label>
      <Select isMulti options={colors} value={color} onChange={setColor} placeholder="انتخاب رنگ" {...selectProps} />

      <label>نوع سوخت</label>
      <Select
        isMulti
        options={fuelTypes}
        value={fuelType}
        onChange={setFuelType}
        placeholder="نوع سوخت"
        {...selectProps}
      />

      <label>وضعیت شاسی</label>
      <Select
        isMulti
        options={chassisStates}
        value={chassisState}
        onChange={setChassisState}
        placeholder="وضعیت شاسی"
        {...selectProps}
      />

      <label>وضعیت موتور</label>
      <Select
        isMulti
        options={engineStates}
        value={engineState}
        onChange={setEngineState}
        placeholder="وضعیت موتور"
        {...selectProps}
      />

      <label>وضعیت بدنه</label>
      <Select
        isMulti
        options={bodyStates}
        value={bodyState}
        onChange={setBodyState}
        placeholder="وضعیت بدنه"
        {...selectProps}
      />

      <label>گیربکس</label>
      <Select isMulti options={gearboxes} value={gearbox} onChange={setGearbox} placeholder="گیربکس" {...selectProps} />

      <label>حداقل مدت بیمه</label>
      <Select
        options={hardcodedDurations}
        value={minInsuranceDuration}
        onChange={setMinInsuranceDuration}
        placeholder="مثلاً ۱ ماه"
        {...selectProps}
      />

      <label>حداکثر مدت بیمه</label>
      <Select
        options={filteredMaxDurations}
        value={maxInsuranceDuration}
        onChange={setMaxInsuranceDuration}
        placeholder="مثلاً ۱۲ ماه"
        {...selectProps}
      />

      <button type="submit" className="alarm-button">
        ثبت هشدار
      </button>
    </form>
  );
};

export default AlarmForm;

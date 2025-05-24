import React, { useState, useEffect } from "react";
import Select from "react-select";
import { createAlarm, getAlarmCreationData, getMakeModels, getStateCities, updateAlarm } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hardcodedDurations, hardcodedMileage, hardcodedPrices, hardcodedYears } from "./constants";

const mapItemsFromAPI = (items) => {
  if (!Array.isArray(items)) {
    return { value: items?.id, label: items?.title };
  }
  return items?.map((item) => ({
    value: item.id,
    label: item.title,
  }));
};

const AlarmForm = ({ existingAlarmData }) => {
  const navigate = useNavigate();

  const [state, setState] = useState(mapItemsFromAPI(existingAlarmData?.state) || null);
  const [city, setCity] = useState(mapItemsFromAPI(existingAlarmData?.city) || null);
  const [make, setMake] = useState(mapItemsFromAPI(existingAlarmData?.make) || null);
  const [model, setModel] = useState(mapItemsFromAPI(existingAlarmData?.model) || null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);
  const [minMileage, setMinMileage] = useState(null);
  const [maxMileage, setMaxMileage] = useState(null);
  const [minInsuranceDuration, setMinInsuranceDuration] = useState(null);
  const [maxInsuranceDuration, setMaxInsuranceDuration] = useState(null);

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedChassisStates, setSelectedChassisStates] = useState([]);
  const [selectedEngineStates, setSelectedEngineStates] = useState([]);
  const [selectedBodyStates, setSelectedBodyStates] = useState([]);
  const [selectedGearboxes, setSelectedGearboxes] = useState([]);

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

  const isEditMode = !!existingAlarmData;

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
    const min = Number(existingAlarmData?.minPrice);
    const minItem = hardcodedPrices.find((item) => item.value === min);
    setMinPrice(minItem);
    const max = Number(existingAlarmData?.maxPrice);
    const maxItem = hardcodedPrices.find((item) => item.value === max);
    setMaxPrice(maxItem);
    const minYear = Number(existingAlarmData?.minYear);
    const minYearItem = hardcodedYears.find((item) => item.value === minYear);
    setMinYear(minYearItem);
    const maxYear = Number(existingAlarmData?.maxYear);
    const maxYearItem = hardcodedYears.find((item) => item.value === maxYear);
    setMaxYear(maxYearItem);
    const minMileage = Number(existingAlarmData?.minMileage);
    const minMileageItem = hardcodedMileage.find((item) => item.value === minMileage);
    setMinMileage(minMileageItem);
    const maxMileage = Number(existingAlarmData?.maxMileage);
    const maxMileageItem = hardcodedMileage.find((item) => item.value === maxMileage);
    setMaxMileage(maxMileageItem);
    const minInsuranceDuration = Number(existingAlarmData?.minInsuranceDuration);
    const minInsuranceDurationItem = hardcodedDurations.find((item) => item.value === minInsuranceDuration);
    setMinInsuranceDuration(minInsuranceDurationItem);
    const maxInsuranceDuration = Number(existingAlarmData?.maxInsuranceDuration);
    const maxInsuranceDurationItem = hardcodedDurations.find((item) => item.value === maxInsuranceDuration);
    setMaxInsuranceDuration(maxInsuranceDurationItem);
  }, []);

  useEffect(() => {
    setSelectedColors(mapItemsFromAPI(existingAlarmData?.colors) || []);
    setSelectedFuelTypes(mapItemsFromAPI(existingAlarmData?.fuelTypes) || []);
    setSelectedChassisStates(mapItemsFromAPI(existingAlarmData?.chassisStates) || []);
    setSelectedEngineStates(mapItemsFromAPI(existingAlarmData?.engineStates) || []);
    setSelectedBodyStates(mapItemsFromAPI(existingAlarmData?.bodyStates) || []);
    setSelectedGearboxes(mapItemsFromAPI(existingAlarmData?.gearboxes) || []);
  }, [existingAlarmData]);

  useEffect(() => {
    if (!isEditMode) {
      setCity(null);
      setCities([]);
    }
    if (!state?.value) return;
    getStateCities(state?.value).then((data) => {
      setCities(mapItemsFromAPI(data));
    });
  }, [state?.value, isEditMode]);

  useEffect(() => {
    if (make?.value) {
      getMakeModels(make.value).then((data) => {
        setModels(mapItemsFromAPI(data));
        if (existingAlarmData?.model && !data.find((m) => m.id === existingAlarmData.model.value)) {
          // setModel(null);
        }
      });
    } else {
      setModels([]);
      if (!isEditMode) setModel(null);
    }
  }, [make, isEditMode, existingAlarmData?.model]);

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

    const alarmPayload = {
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
      colorIds: selectedColors.map((item) => item.value),
      fuelTypeIds: selectedFuelTypes.map((item) => item.value),
      chassisStateIds: selectedChassisStates.map((item) => item.value),
      engineStateIds: selectedEngineStates.map((item) => item.value),
      bodyStateIds: selectedBodyStates.map((item) => item.value),
      gearboxIds: selectedGearboxes.map((item) => item.value),
    };

    if (isEditMode && existingAlarmData?.id) {
      // Call update API
      console.log({ alarmPayload });
      updateAlarm(existingAlarmData.id, alarmPayload)
        .then((response) => {
          console.log("Alarm updated:", response);
          toast.success("هشدار با موفقیت ویرایش شد!");
          navigate("/app/alarms");
        })
        .catch((error) => {
          console.error("Error updating alarm:", error);
          toast.error(error?.response?.data?.message || "خطا در ویرایش هشدار!");
        });
    } else {
      // Call create API
      createAlarm(alarmPayload)
        .then((response) => {
          console.log("Alarm created:", response);
          toast.success("هشدار جدید با موفقیت ثبت شد!");
          navigate("/app/alarms");
        })
        .catch((error) => {
          console.error("Error creating alarm:", error);
          toast.error(error?.response?.data?.message || "خطا در ثبت هشدار!");
        });
    }
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
      <Select
        isMulti
        options={colors}
        value={selectedColors}
        onChange={setSelectedColors}
        placeholder="انتخاب رنگ"
        {...selectProps}
      />

      <label>نوع سوخت</label>
      <Select
        isMulti
        options={fuelTypes}
        value={selectedFuelTypes}
        onChange={setSelectedFuelTypes}
        placeholder="نوع سوخت"
        {...selectProps}
      />

      <label>وضعیت شاسی</label>
      <Select
        isMulti
        options={chassisStates}
        value={selectedChassisStates}
        onChange={setSelectedChassisStates}
        placeholder="وضعیت شاسی"
        {...selectProps}
      />

      <label>وضعیت موتور</label>
      <Select
        isMulti
        options={engineStates}
        value={selectedEngineStates}
        onChange={setSelectedEngineStates}
        placeholder="وضعیت موتور"
        {...selectProps}
      />

      <label>وضعیت بدنه</label>
      <Select
        isMulti
        options={bodyStates}
        value={selectedBodyStates}
        onChange={setSelectedBodyStates}
        placeholder="وضعیت بدنه"
        {...selectProps}
      />

      <label>گیربکس</label>
      <Select
        isMulti
        options={gearboxes}
        value={selectedGearboxes}
        onChange={setSelectedGearboxes}
        placeholder="گیربکس"
        {...selectProps}
      />

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
        {existingAlarmData ? "ویرایش" : "ثبت"}
      </button>
    </form>
  );
};

export default AlarmForm;

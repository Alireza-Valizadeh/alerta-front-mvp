import React, { useState, useEffect } from "react";
import Select from "react-select";
import { createAlarm, getAlarmCreationData, getMakeModels, getStateCities, updateAlarm } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { hardcodedDurations, hardcodedMileage, hardcodedPrices, hardcodedYears } from "./constants";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const mapItemsFromAPI = (items) => {
  if (!items) return [];
  if (!Array.isArray(items)) {
    return { value: items?.id, label: items?.title };
  }
  return items.map((item) => ({
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

  const [name, setName] = useState(existingAlarmData?.name || "");
  const [isDisabled, setIsDisabled] = useState(existingAlarmData?.isDisabled || false);

  const isEditMode = !!existingAlarmData;

  // Section open/close state
  const [openMain, setOpenMain] = useState(true);
  const [openGeneral, setOpenGeneral] = useState(false);
  const [openAdvanced, setOpenAdvanced] = useState(false);

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
    if (state?.value) {
      getStateCities(state?.value).then((data) => {
        const newOptions = mapItemsFromAPI(data);
        setCities(newOptions);
        if (!newOptions.find((c) => c.value === city?.value)) {
          setCity(null);
        }
      });
    } else {
      setCities([]);
      setCity(null);
    }
  }, [state, isEditMode]);

  useEffect(() => {
    if (make?.value) {
      getMakeModels(make.value).then((data) => {
        const newOptions = mapItemsFromAPI(data);
        setModels(newOptions);
        if (!newOptions.find((m) => m.value === model?.value)) {
          setModel(null);
        }
      });
    } else {
      setModels([]);
      setModel(null);
    }
  }, [make]);

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
      name: name.trim(),
      isDisabled,
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
      {/* Main Info Section */}
      <div style={{ borderRadius: 8, border: '1px solid #e0e0e0', marginBottom: 16 }}>
        <div
          style={{
            cursor: "pointer",
            background: "#f7fafd",
            padding: "0.5rem 1rem",
            fontWeight: 700,
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 36,
          }}
          onClick={() => setOpenMain((v) => !v)}
        >
           استان، شهر، برند و مدل
          {openMain ? <MdExpandLess size={22} /> : <MdExpandMore size={22} />}
        </div>
        {openMain && (
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            <label>
              استان <span style={{ color: "red" }}>*</span>
            </label>
            <Select options={states} value={state} onChange={setState} placeholder="انتخاب استان" {...selectProps} />
            <label>شهر</label>
            <Select options={cities} value={city} onChange={setCity} placeholder="انتخاب شهر" {...selectProps} />
            <label>
              برند <span style={{ color: "red" }}>*</span>
            </label>
            <Select options={makes} value={make} onChange={setMake} placeholder="انتخاب برند" {...selectProps} />
            <label>مدل</label>
            <Select options={models} value={model} onChange={setModel} placeholder="انتخاب مدل" {...selectProps} />
          </div>
        )}
      </div>
      {/* General Info Section */}
      <div style={{ borderRadius: 8, border: '1px solid #e0e0e0', marginBottom: 16 }}>
        <div
          style={{
            cursor: "pointer",
            background: "#f7fafd",
            padding: "0.5rem 1rem",
            fontWeight: 700,
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 36,
          }}
          onClick={() => setOpenGeneral((v) => !v)}
        >
           قیمت، سال تولید، کارکرد و بیمه
          {openGeneral ? <MdExpandLess size={22} /> : <MdExpandMore size={22} />}
        </div>
        {openGeneral && (
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            <label>حداقل قیمت</label>
            <Select
              options={hardcodedPrices}
              value={minPrice}
              onChange={setMinPrice}
              placeholder="حداقل قیمت"
              {...selectProps}
            />
            <label>حداکثر قیمت</label>
            <Select
              options={filteredMaxPrices}
              value={maxPrice}
              onChange={setMaxPrice}
              placeholder="حداکثر قیمت"
              {...selectProps}
            />
            <label>حداقل سال</label>
            <Select
              options={hardcodedYears}
              value={minYear}
              onChange={setMinYear}
              placeholder="حداقل سال"
              {...selectProps}
            />
            <label>حداکثر سال</label>
            <Select
              options={filteredMaxYears}
              value={maxYear}
              onChange={setMaxYear}
              placeholder="حداکثر سال"
              {...selectProps}
            />
            <label>حداقل کارکرد</label>
            <Select
              options={hardcodedMileage}
              value={minMileage}
              onChange={setMinMileage}
              placeholder="حداقل کارکرد"
              {...selectProps}
            />
            <label>حداکثر کارکرد</label>
            <Select
              options={filteredMaxMileage}
              value={maxMileage}
              onChange={setMaxMileage}
              placeholder="حداکثر کارکرد"
              {...selectProps}
            />
            <label>حداقل مدت بیمه</label>
            <Select
              options={hardcodedDurations}
              value={minInsuranceDuration}
              onChange={setMinInsuranceDuration}
              placeholder="حداقل مدت بیمه"
              {...selectProps}
            />
            <label>حداکثر مدت بیمه</label>
            <Select
              options={filteredMaxDurations}
              value={maxInsuranceDuration}
              onChange={setMaxInsuranceDuration}
              placeholder="حداکثر مدت بیمه"
              {...selectProps}
            />
          </div>
        )}
      </div>
      {/* Advanced Details Section */}
      <div style={{ borderRadius: 8, border: '1px solid #e0e0e0', marginBottom: 16 }}>
        <div
          style={{
            cursor: "pointer",
            background: "#f7fafd",
            padding: "0.5rem 1rem",
            fontWeight: 700,
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 36,
          }}
          onClick={() => setOpenAdvanced((v) => !v)}
        >
          جزئیات پیشرفته
          {openAdvanced ? <MdExpandLess size={22} /> : <MdExpandMore size={22} />}
        </div>
        {openAdvanced && (
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
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
              placeholder="انتخاب نوع سوخت"
              {...selectProps}
            />
            <label>وضعیت شاسی</label>
            <Select
              isMulti
              options={chassisStates}
              value={selectedChassisStates}
              onChange={setSelectedChassisStates}
              placeholder="انتخاب وضعیت شاسی"
              {...selectProps}
            />
            <label>وضعیت موتور</label>
            <Select
              isMulti
              options={engineStates}
              value={selectedEngineStates}
              onChange={setSelectedEngineStates}
              placeholder="انتخاب وضعیت موتور"
              {...selectProps}
            />
            <label>وضعیت بدنه</label>
            <Select
              isMulti
              options={bodyStates}
              value={selectedBodyStates}
              onChange={setSelectedBodyStates}
              placeholder="انتخاب وضعیت بدنه"
              {...selectProps}
            />
            <label>گیربکس</label>
            <Select
              isMulti
              options={gearboxes}
              value={selectedGearboxes}
              onChange={setSelectedGearboxes}
              placeholder="انتخاب گیربکس"
              {...selectProps}
            />
          </div>
        )}
      </div>
      {/* Alarm Name and Disabled at the bottom */}
      <div style={{ borderRadius: 8, border: "1px solid #e0e0e0", marginBottom: 16, padding: 16, background: "#fff", display: "flex", flexDirection: "column" }}>
        <label>نام هشدار</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام هشدار"
          style={{ width: "100%" }}
        />
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 0 }}>
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={(e) => setIsDisabled(e.target.checked)}
            style={{ width: 18, height: 18 }}
          />
          غیرفعال باشد؟
        </label>
      </div>
      <button type="submit" className="alarm-button" style={{ marginTop: 12 }}>
        {existingAlarmData ? "ویرایش" : "ثبت"}
      </button>
    </form>
  );
};

export default AlarmForm;

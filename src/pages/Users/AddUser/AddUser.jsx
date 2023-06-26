import { useRef, useState } from "react";

import useDebounce from "src/hooks/useDebounce";

import useCreateUser from "src/api/users/useCreateUser";
import useGetStates from "src/api/states-cities/useGetStates";
import useSearchCities from "src/api/states-cities/useSearchCities";

import FormRow from "src/components/Form/FormRow";
import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import FormSelect from "src/components/Form/FormSelect";
import FormComboBox from "src/components/Form/FormComboBox";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

const positions = [
  { id: 1, name: "Admin", label: "Admin" },
  { id: 2, name: "Site Staff", label: "Site Staff" },
  { id: 3, name: "Sponsor Staff", label: "Sponsor Staff" },
  { id: 4, name: "Sponsor Admin", label: "Sponsor Admin" },
];

function AddUser() {
  const formRef = useRef(null);

  const { states } = useGetStates();
  const { mutate } = useCreateUser({
    resetForm: () => null,
  });

  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [showCityBox, setShowCityBox] = useState(false);

  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce({ value: search, delay: 600 });

  const { searchedCities } = useSearchCities(state, debouncedValue);

  function openCityBox() {
    setShowCityBox(true);
  }

  function closeCityBox() {
    setShowCityBox(false);
  }

  function selectCity(id, name) {
    setCity(id);
    setSearch(name);
    closeCityBox();
  }

  const getPositionTitle = (id) =>
    positions.filter((item) => item.id === id)[0].name;

  async function handleAddUser(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());

    const {
      username,
      email,
      password,
      firstName,
      lastName,
      position,
      address1,
      address2,
      contactNumber,
      stateId,
      zipcode,
    } = formData;

    mutate({
      username,
      password,
      roleId: parseInt(position),
      profile: {
        firstName,
        lastName,
        position: getPositionTitle(parseInt(position)),
        email,
        contactNumber,
        address1,
        address2,
        cityId: parseInt(city),
        stateId: parseInt(stateId),
        zipcode,
      },
    });

    if (formRef) {
      formRef.current.reset();
      setSearch("");
      setState(null);
    }
  }

  return (
    <>
      <BlackNavbar />
      <div className="pb-10">
        <div className="w-[400px] border border-gray-400 rounded-2xl pt-4">
          <img
            src="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
            alt=""
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
          />
          <form ref={formRef} className="" onSubmit={handleAddUser}>
            <div className="p-6 border-b">
              <FormRow>
                <FormCol label="Firstname">
                  <FormInput name="firstName" type="text" required />
                </FormCol>
              </FormRow>
              <FormRow>
                <FormCol label="Lastname">
                  <FormInput name="lastName" type="text" required />
                </FormCol>
              </FormRow>
              <FormRow>
                <FormCol label="Position">
                  <FormSelect name="position" options={positions} required />
                </FormCol>
              </FormRow>
            </div>

            <div className="p-6 border-b">
              <FormRow>
                <FormCol label="Username">
                  <FormInput name="username" type="text" required />
                </FormCol>
              </FormRow>
              <FormRow>
                <FormCol label="Password">
                  <FormInput name="password" type="password" required />
                </FormCol>
              </FormRow>
              <FormRow>
                <FormCol label="Email">
                  <FormInput name="email" type="email" required />
                </FormCol>
              </FormRow>
              <FormRow>
                <FormCol label="Contact No.">
                  <FormInput name="contactNumber" type="text" required />
                </FormCol>
              </FormRow>
            </div>

            <div className="p-6 border-b">
              <FormRow>
                <FormCol label="Address">
                  <FormInput name="address1" type="text" required />
                </FormCol>
              </FormRow>
              <FormRow>
                <FormCol label="Address 2">
                  <FormInput name="address2" type="text" required />
                </FormCol>
              </FormRow>
              <FormRow>
                <FormCol label="State">
                  <FormSelect
                    name="stateId"
                    options={states || []}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </FormCol>
              </FormRow>

              <FormRow>
                <FormCol label="City">
                  <FormComboBox
                    name="cityId"
                    options={searchedCities || []}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    showBox={showCityBox}
                    handleOpenBox={openCityBox}
                    handleCloseBox={closeCityBox}
                    handleSelect={selectCity}
                    required
                  />
                </FormCol>
                <FormCol label="Zip code">
                  <FormInput name="zipcode" type="text" />
                </FormCol>
              </FormRow>
            </div>

            <div className="form-actions py-4">
              <button className="form-proceed-button" type="submit">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddUser;
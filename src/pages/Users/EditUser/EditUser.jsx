import { useEffect, useRef, useState } from "react";

import useDebounce from "src/hooks/useDebounce";

import useUpdateUser from "src/api/users/useUpdateUser";
import useGetStates from "src/api/states-cities/useGetStates";
import useSearchCities from "src/api/states-cities/useSearchCities";

import FormRow from "src/components/Form/FormRow";
import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import FormSelect from "src/components/Form/FormSelect";
import FormComboBox from "src/components/Form/FormComboBox";

import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import useGetUser from "../../../api/users/useGetUser";
import useZodForm from "src/hooks/useZodForm";
import userSchema from "src/schema/userSchema";

function EditUser() {
	const { userDetails } = useAuthContext();
  const { userId } = useParams();
	const formRef = useRef(null);

	const { states } = useGetStates();
	const { mutate } = useUpdateUser({
		resetForm: () => null,
    userId
	});

	const [state, setState] = useState(null);
	const [city, setCity] = useState(null);
	const [showCityBox, setShowCityBox] = useState(false);

	const [search, setSearch] = useState("");

	const debouncedValue = useDebounce({ value: search, delay: 600 });

	const { searchedCities } = useSearchCities(state, debouncedValue);

	let positions = [
		{ id: 5, name: "Admin", label: "Admin" },
		{ id: 2, name: "Site Staff", label: "Site Staff" },
		{ id: 3, name: "Sponsor Staff", label: "Sponsor Staff" },
		{ id: 4, name: "Sponsor Admin", label: "Sponsor Admin" },
	];

	const sponsorAdminAllowedPositions = positions.filter(
		(item) => item.id !== 1 && item.id !== 2 && item.id !== 5
	);

	const adminAllowedPositions = positions.filter((item) => item.id !== 5);

	positions =
		userDetails.roleId === 4
			? sponsorAdminAllowedPositions
			: userDetails.roleId === 5
			? adminAllowedPositions
			: positions;

	const { user, api } = useGetUser(userId);
  const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useZodForm(userSchema);

	useEffect(() => {
		if (!api.isLoading) {
			setState(user.profile.stateId);
			setSearch(user.profile.cityName);
		}
	}, []);

	if (api.isLoading) {
		return <div>Loading...</div>;
	}

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

	async function handleUpdateUser(data) {
		const {
			username,
			email,
			firstName,
			lastName,
			position,
			address1,
			address2,
			contactNumber,
			zipcode,
		} = data;

		mutate({
			username,
			roleId: parseInt(position),
			profile: {
				firstName,
				lastName,
				position: getPositionTitle(parseInt(position)),
				email,
				contactNumber,
				address1,
				address2,
				cityId: parseInt(searchedCities[0].id),
				stateId: parseInt(state),
				zipcode,
			},
		});

    navigate(-1);
	}
	return (
		<>
			<div className="pb-10 relative">
				<div className="">
					<img
						src="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
						alt=""
						className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
					/>
					<form
						ref={formRef}
						className=""
						onSubmit={handleSubmit(handleUpdateUser)}
					>
						<div className="w-[400px] border border-gray-400 rounded-2xl pt-4">
							<div className="p-6 border-b">
								<FormRow>
									<FormCol label="Firstname" error={errors.firstName}>
										<FormInput
											name="firstName"
											type="text"
											required
											{...register("firstName")}
											defaultValue={user.profile.firstName}
										/>
									</FormCol>
								</FormRow>
								<FormRow>
									<FormCol label="Lastname" error={errors.lastName}>
										<FormInput
											name="lastName"
											type="text"
											{...register("lastName")}
											defaultValue={user.profile.lastName}
											required
										/>
									</FormCol>
								</FormRow>
								<FormRow>
									<FormCol label="Position" error={errors.position}>
										<FormSelect
											name="position"
											options={positions}
											required
											{...register("position")}
											defaultValue={
												positions.find(
													(position) => position.name === user.profile.position
												)?.id
											}
										/>
									</FormCol>
								</FormRow>
							</div>

							<div className="p-6 border-b">
								<FormRow>
									<FormCol label="Username" error={errors.username}>
										<FormInput
											name="username"
											type="text"
											required
											{...register("username")}
											defaultValue={user.username}
										/>
									</FormCol>
								</FormRow>
								<FormRow>
									<FormCol label="Email" error={errors.email}>
										<FormInput
											name="email"
											type="email"
											required
											{...register("email")}
											defaultValue={user.profile.email}
										/>
									</FormCol>
								</FormRow>
								<FormRow>
									<FormCol label="Contact No." error={errors.contactNumber}>
										<FormInput
											name="contactNumber"
											type="text"
											required
											{...register("contactNumber")}
											defaultValue={user.profile.contactNumber}
										/>
									</FormCol>
								</FormRow>
							</div>

							<div className="p-6">
								<FormRow>
									<FormCol label="Address" error={errors.address1}>
										<FormInput
											name="address1"
											type="text"
											required
											{...register("address1")}
											defaultValue={user.profile.address1}
										/>
									</FormCol>
								</FormRow>
								<FormRow>
									<FormCol label="Address 2" error={errors.address2}>
										<FormInput
											name="address2"
											type="text"
											required
											{...register("address2")}
											defaultValue={user.profile.address2}
										/>
									</FormCol>
								</FormRow>
								<FormRow>
									<FormCol label="State" error={errors.state}>
										<FormSelect
											name="stateId"
											options={states || []}
											value={state}
											onChange={(e) => {
												setState(e.target.value);
												setSearch("");
											}}
											required
											// {...register("stateId")}
											defaultValue={user.profile.stateId}
										/>
									</FormCol>
								</FormRow>

								<FormRow>
									<FormCol label="City" error={errors.cityId}>
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
											readOnly
											// {...register("cityId")}
										/>
									</FormCol>
									<FormCol label="Zip code" error={errors.zipcode}>
										<FormInput
											name="zipcode"
											type="text"
											{...register("zipcode")}
											defaultValue={user.profile.zipcode}
										/>
									</FormCol>
								</FormRow>
							</div>
						</div>

						<div className="absolute -left-80 top-5 w-full flex items-center">
							<button
								type="submit"
								className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
							>
								Update User
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default EditUser;

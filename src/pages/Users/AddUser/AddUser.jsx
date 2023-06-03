import "./AddUser.styles.css";
import Drug from "src/assets/images/svgs/Drug.svg";
import Iv from "src/assets/images/svgs/Iv.svg";
import Bandage from "src/assets/images/svgs/Bandage.svg";
import Needle from "src/assets/images/svgs/Needle.svg";
import Surgery from "src/assets/images/svgs/Surgery.svg";
import Respirator from "src/assets/images/svgs/Respirator.svg";
import colorPalette from "src/utils/styles/colorPalette";
import { useEffect, useState } from "react";
import BlackNavbar from "../../../components/Protocols/BlackNavbar/BlackNavbar";
import { privateClient } from "../../../api";
import { hasBlank } from "../../../utils";
import { useUserContext } from "../../../contexts/UserContext";
import { toast } from "react-hot-toast";
import { AiOutlineUserAdd } from "react-icons/ai";
import AvatarContainer from "../../../components/AvatarContainer/AvatarContainer";

let notification = "";

function AddUser() {
	const { fetchUsers } = useUserContext();

	// api dependent states
	const [positions, setPositions] = useState([
		{ id: 1, name: "Admin" },
		{ id: 2, name: "Sponsor" },
		{ id: 3, name: "Office Assistant" },
		{ id: 4, name: "Medical Monitor" },
		{ id: 5, name: "Doctor" },
		{ id: 6, name: "RN" },
	]);
	const [states, setStates] = useState([
		{ id: 1, name: "NV" },
		{ id: 2, name: "CA" },
		{ id: 3, name: "NY" },
		{ id: 4, name: "TX" },
		{ id: 5, name: "FL" },
	]);

	// image doesnt work in state bulking for some reason
	const [image, setImage] = useState("");

	// default fields are set here
	const fields = [
		{
			name: "firstName",
			fieldName: "First Name",
			type: "text",
		},
		{
			name: "lastName",
			fieldName: "Last Name",
			type: "text",
		},
		{
			name: "position",
			fieldName: "Position",
			type: "select",
			value: positions,
		},
		{ type: "break" },
		{
			name: "email",
			fieldName: "Email",
			type: "text",
		},
		{
			name: "contactNo",
			fieldName: "Contact Number",
			type: "text",
		},
		{ type: "break" },
		{
			name: "address1",
			fieldName: "Address",
			type: "text",
		},
		{
			name: "address2",
			fieldName: "Address 2",
			type: "text",
		},
		{
			name: "city",
			fieldName: "City",
			type: "text",
		},
		{
			type: "column",
			child: [
				{
					name: "state",
					fieldName: "State",
					type: "select",
					value: states,
					column: 2,
				},
				{
					name: "zip",
					fieldName: "ZIP Code",
					type: "text",
					column: 2,
				},
			],
		},

		{
			name: "notes",
			fieldName: "Notes",
			type: "textarea",
			value: "",
		},
	];

	// states
	const initialState = {
		userId: "",
		firstName: "",
		lastName: "",
		position: "",
		email: "",
		contactNo: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zip: "",
		notes: "",
	};

	const [formData, setFormData] = useState(initialState);

	const {
		userId,
		firstName,
		lastName,
		position,
		email,
		contactNo,
		address1,
		address2,
		city,
		state,
		zip,
		notes,
	} = formData;

	// useEffect(() => {
	// 	fetchPositions();
	// }, []);

	const isDisabled = () =>
		hasBlank([
			// userId,
			firstName,
			lastName,
			position,
			email,
			contactNo,
			address1,
			address2,
			city,
			state,
			zip,
			notes,
      image,
		]);

	async function fetchPositions() {
		try {
			const res = await privateClient({
				url: `/positions?page=1`,
			});
			setPositions(res.data.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function addUser() {
		try {
			notification = toast.loading("Adding User...");
			await privateClient({
				url: "/users",
				method: "post",
				data: {
					userId,
					firstName,
					lastName,
					position,
					email,
					contactNo,
					address1,
					address2,
					city,
					state,
					zip,
					notes,
					image,
				},
			});
			resetState();
			fetchUsers();
			toast.success("User has been added successfully.", {
				id: notification,
			});
		} catch (error) {
			toast.error(error, {
				id: notification,
			});
		}
	}

	function resetState() {
		setFormData(initialState);
	}

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				// setFormData({ ...formData, userImage: reader.result });
				setImage(reader.result);
			}
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const renderFields = (fields) => {
		return fields.map((field, index) => {
			if (field.type === "text") {
				return (
					<div
						key={index}
						className={`generalInfo__section ${
							field.column ? `w-1/${field.column}` : ""
						}`}
					>
						<p>{field.fieldName}</p>
						<input
							value={formData[field.name]}
							onChange={(e) =>
								setFormData({ ...formData, [field.name]: e.target.value })
							}
						/>
					</div>
				);
			}

			if (field.type === "select") {
				return (
					<div
						key={index}
						className={`generalInfo__section ${
							field.column ? `w-1/${field.column}` : ""
						}`}
					>
						<p>{field.fieldName}</p>
						<select
							value={formData[field.name]}
							onChange={(e) => {
								setFormData({ ...formData, [field.name]: e.target.value });
							}}
						>
							<option value="">Select {field.fieldName}</option>
							{field.value?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</select>
					</div>
				);
			}

			if (field.type === "textarea") {
				return (
					<div
						key={index}
						className={`generalInfo__section ${
							field.column ? `w-1/${field.column}` : ""
						}`}
					>
						<p>{field.fieldName}</p>
						<textarea
							className="form-input"
							rows="10"
							value={formData[field.name]}
							onChange={(e) =>
								setFormData({ ...formData, [field.name]: e.target.value })
							}
						/>
					</div>
				);
			}

			if (field.type === "column") {
				return (
					<div key={index} className="flex">
						{renderFields(field.child)}
					</div>
				);
			}

			if (field.type === "break") {
				return (
					<div
						key={index}
						style={{
							width: "100%",
							height: 1,
							background: "gray",
							margin: "20px 0",
						}}
					/>
				);
			}

			return null;
		});
	};

	return (
		<div>
			<BlackNavbar></BlackNavbar>

			<div className="generalInfo">
				<figure className="mb-[30px] flex justify-center">
					{image ? (
						<div>
							<img
								src={image}
								alt="Uploaded"
								className="w-[100px] h-[100px] rounded-full"
							/>
							<div className="addUser__buttonContainer">
								<button
									onClick={() => {
										setImage("");
										// setFormData({ ...formData, userImage: null });
									}}
									className="text-sm addUser__button"
									style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
								>
									Clear
								</button>
							</div>
						</div>
					) : (
						<label htmlFor="upload-input">
							<AvatarContainer Icon={AiOutlineUserAdd} />
							<input
								id="upload-input"
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								hidden
							/>
						</label>
					)}
				</figure>

				<div className="form-container">{renderFields(fields)}</div>
			</div>

			{/* footer */}
			<div className="addUser__buttonContainer">
				<button
					className="addUser__button"
					style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
					disabled={isDisabled()}
					onClick={addUser}
				>
					Add User
				</button>
			</div>
		</div>
	);
}

export default AddUser;

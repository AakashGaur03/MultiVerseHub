import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getcricketSearchPlayer, getEntertainmentSearchData, getNews } from "../../Features";
import LocalSearchDialogBox from "./LocalSearchDialogBox";
import { useLocation } from "react-router-dom";

const LocalSearch = () => {
	const [searchLocalQuery, setSearchLocalQuery] = useState("");
	const [prevSearchLocalQuery, setPrevSearchLocalQuery] = useState("");
	const [searchPlaceHolder, setSearchPlaceHolder] = useState("Search");
	const dispatch = useDispatch();
	const location = useLocation();
	const currentSidebar = useSelector((state) => state.sidebar.currentSidebar);
	const searchPlayersData = useSelector((state) => state.cricket.searchPlayer);
	const theme = useSelector((state) => state.theme.theme);

	useEffect(() => {
		setSearchLocalQuery("");
		setPrevSearchLocalQuery("");
	}, [location.pathname]);

	useEffect(() => {
		if (location.pathname.includes("/news")) {
			setSearchPlaceHolder("Search News");
		} else if (location.pathname.includes("/entertainment")) {
			if (currentSidebar === "TV") {
				setSearchPlaceHolder("");
				setSearchPlaceHolder("Search TV");
			} else {
				setSearchPlaceHolder("");
				setSearchPlaceHolder("Search Movies");
			}
		} else if (location.pathname.includes("/cricket")) {
			setSearchPlaceHolder("");
			setSearchPlaceHolder("Search Player");
		} else {
			setSearchPlaceHolder("");
			setSearchPlaceHolder("Search");
		}
	}, [location.pathname, currentSidebar]);
	const callSearch = async () => {
		if (location.pathname.includes("/news")) {
			await dispatch(getNews(searchLocalQuery));
		} else if (location.pathname.includes("/entertainment")) {
			let category = "";
			if (currentSidebar === "TV") {
				category = "tv";
			} else {
				category = "movie";
			}
			let payload = {
				category,
				searchQuery: searchLocalQuery,
			};
			await dispatch(getEntertainmentSearchData(payload));
		} else if (location.pathname.includes("/cricket")) {
			let payload = {
				playeraName: searchLocalQuery,
			};
			dispatch(getcricketSearchPlayer(payload));
		}
	};

	const handleLocalSearch = async () => {
		if (searchLocalQuery.trim() === "" && prevSearchLocalQuery.trim() !== "") {
			callSearch();
		} else if (searchLocalQuery.trim() !== "") {
			callSearch();
		}
		setPrevSearchLocalQuery(searchLocalQuery);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			handleLocalSearch();
		}, 1000);
		return () => clearTimeout(timeout);
	}, [searchLocalQuery, location.pathname]);

	const handleChange = (e) => {
		setSearchLocalQuery(e.target.value);
	};
	return (
		<div>
			<Form className="d-flex">
				<Form.Control
					className={`min-w-36 ${
						theme === "dark"
							? "bg-dark text-light border-secondary dark-placeholder"
							: "bg-white text-dark border-dark light-placeholder"
					}`}
					style={{
						backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
						color: theme === "dark" ? "#fff" : "#000",
						borderColor: theme === "dark" ? "#444" : "#ccc",
					}}
					type="search"
					placeholder={searchPlaceHolder}
					onChange={handleChange}
					value={searchLocalQuery}
					id="searchLocalQuery"
					data-id="qyuery"
				/>

				{/* <button type="submit" className="btn btn-outline-primary">
          Submit
        </button> */}
			</Form>
			{searchPlayersData && (
				<LocalSearchDialogBox searchPlayersData={searchPlayersData} setSearchLocalQuery={setSearchLocalQuery} />
			)}
		</div>
	);
};

export default LocalSearch;

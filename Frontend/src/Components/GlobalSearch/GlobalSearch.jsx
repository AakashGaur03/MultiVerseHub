import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNews, getEntertainmentSearchData, getcricketSearchPlayer } from "../../Features";

const GlobalSearch = () => {
	const [query, setQuery] = useState("");
	const [prevQuery, setPrevQuery] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor);

	const handleSearch = async () => {
		const trimmed = query.trim();
		if (!trimmed || trimmed === prevQuery) return;
		console.log(trimmed, "trimmed");
		await Promise.all([
			dispatch(getNews(trimmed)),
			dispatch(getEntertainmentSearchData({ category: "tv", searchQuery: trimmed })),
			dispatch(getEntertainmentSearchData({ category: "movie", searchQuery: trimmed })),
			dispatch(getcricketSearchPlayer({ playeraName: trimmed })),
		]);

		setPrevQuery(trimmed);
		navigate(`/search?q=${encodeURIComponent(trimmed)}`);
	};

	useEffect(() => {
		const delayDebounce = setTimeout(() => {
			handleSearch();
		}, 1000);

		return () => clearTimeout(delayDebounce);
	}, [query]);

	return (
		<Form className="d-flex w-100" onSubmit={(e) => e.preventDefault()}>
			<Form.Control
				type="search"
				placeholder="Search News, Movies, TV, Cricket..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
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
			/>
		</Form>
	);
};

export default GlobalSearch;

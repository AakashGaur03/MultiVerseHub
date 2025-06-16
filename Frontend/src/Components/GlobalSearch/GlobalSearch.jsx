import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getNews, getEntertainmentSearchData, getcricketSearchPlayer } from "../../Features";

const GlobalSearch = () => {
	const [query, setQuery] = useState("");
	const [prevQuery, setPrevQuery] = useState("");
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.theme.theme);

	const handleSearch = async () => {
		if (!query.trim() && prevQuery.trim()) return;

		const trimmed = query.trim();

		await Promise.all([
			dispatch(getNews(trimmed)),
			dispatch(getEntertainmentSearchData({ category: "tv", searchQuery: trimmed })),
			dispatch(getEntertainmentSearchData({ category: "movie", searchQuery: trimmed })),
			dispatch(getcricketSearchPlayer({ playeraName: trimmed })),
		]);

		setPrevQuery(trimmed);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			handleSearch();
		}, 1000);
		return () => clearTimeout(timeout);
	}, [query]);

	return (
		<Form className="d-flex w-100">
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

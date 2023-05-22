import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

import { apiPrivate } from '../apis/axios';
import path from '../apis/endpoints';

const Postings = ({ message, isLarge }) => {
	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		try {
			const response = await apiPrivate.get(path.POSTS_URL);
			setPosts(response.data);
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	// style={{ backgroundColor: '#fe9a2e' }}
	return (
		<div className='col-12 col-xl-10'>
			{/* <div className='row'> */}
			<div className={isLarge ? 'col-12 col-xl-10 position-fixed' : 'col-12 col-xl-10 position-static'}>
				<div className='row' style={{ backgroundColor: '#fe9a2e' }}>
					<nav className='d-flex justify-content-center gap-4 list-unstyled p-2'>
						<li className='fs-4 text-decoration-none fw-semibold'>
							<Link className='linkStyle' to='#'>
								Adoção
							</Link>
						</li>
						<li className='fs-4 text-decoration-none fw-semibold'>
							<Link className='linkStyle' to='#'>
								Cruzamento
							</Link>
						</li>
						<li className='fs-4 text-decoration-none fw-semibold'>
							<Link className='linkStyle' to='#'>
								Eventos
							</Link>
						</li>
					</nav>
				</div>
			</div>
			{/* </div> */}
			<br />
			<ul className='row list-unstyled mt-xl-5'>
				{posts.length !== 0 ? (
					posts.map((post) => (
						<li key={post._id} className='col-12 col-md-6 col-xxl-4'>
							<Card data={post} />
							<br />
						</li>
					))
				) : (
					<p>{message}</p>
				)}
			</ul>
		</div>
	);
};

export default Postings;

import { useState } from 'react';

import useLogout from '../hooks/useLogout';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const ModalDelete = ({ post, message }) => {
	const logout = useLogout();
	const apiPrivate = useApiPrivate();

	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	const handleDelete = async () => {
		try {
			if (!post) document.querySelector('#confirmButton').setAttribute('disabled', true);
			document.querySelector('#deleteButton').setAttribute('disabled', true);
			setSuccessMsg('Exclusão efetuada com sucesso!');
			setTimeout(async () => {
				setSuccessMsg('');
				if (post) {
					await apiPrivate.delete(`${path.AUTH_POSTS_ID_URL}${post?._id}`);
				} else {
					await logout();
					await apiPrivate.delete(path.AUTH_USER_URL);
				}
			}, 5000);
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			if (!error?.response) {
				setErrorMsg('Sem resposta do servidor!');
			} else if (error.response?.status === 404) {
				setErrorMsg(`${error.response?.data?.Erro}`);
			} else {
				setErrorMsg('Algo deu errado!');
			}
			setTimeout(() => {
				setErrorMsg('');
			}, 5000);
		}
	};

	return (
		<div className='my-modal-box col-11 col-xxl-8 d-flex flex-column justify-content-center'>
			<div className='p-4 text-center'>
				<p className='py-3 m-0 fs-4'>{message}</p>
				<div className='py-2'>
					<button
						className='btn btn-danger btn-lg'
						style={{ border: 'none' }}
						type='button'
						id='deleteButton'
						onClick={handleDelete}
					>
						Sim, confirmo a exclusão
					</button>
				</div>
			</div>
			<section className='px-5 text-center my-2'>
				{successMsg && (
					<p className={successMsg ? 'p-2 successmsg' : 'p-2 invisible'}>
						{successMsg} <span className='align-middle fs-4'>&#128546;</span>
					</p>
				)}
				{errorMsg && (
					<p className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>
						{errorMsg} <span className='align-middle fs-4'>&#128533;</span>
					</p>
				)}
			</section>
		</div>
	);
};

export default ModalDelete;

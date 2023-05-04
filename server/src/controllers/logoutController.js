const User = require('../models/User');

// No cliente, devemos também deletar o accessToken
const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(204).json({ Mensagem: 'Desconexão realizada com sucesso!' }); // No content

	const refreshToken = cookies.jwt;

	const foundUser = await User.findOne({ refreshToken }).exec();
	// Apagando o cookie jwt salvo no browser mesmo se não encontrarmos o usuário
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		// O objeto de configuração do médoto clearCookie não precisa dos atributos "maxAge" e "expires", de resto deve ser tudo igual
		return res.status(204).json({ Mensagem: 'Desconexão realizada com sucesso!' }); // No content
	}

	// foundUser recebe o documento do banco de dados que estávamos procurando, então podemos fazer as alterações necessárias e salvar
	foundUser.refreshToken = '';
	const result = await foundUser.save();
	console.log(result);

	// Apagando o cookie jwt salvo no browser depois de apagar o refreshToken salvo com o usuário
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	// O atributo "secure" é necessário para https já o "sameSite" com valor "None" é necessário para habilitar o uso entre sites (uso do cookie?)
	return res.status(204).json({ Mensagem: 'Desconexão realizada com sucesso!' }); // No content
};

// res.clearCookie('tokenUsuario', { path: '/', domain: 'localhost' });

module.exports = { handleLogout };

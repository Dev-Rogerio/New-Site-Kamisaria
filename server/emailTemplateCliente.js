export const gerarTemplateCliente = (data) => {
    const { nome, produto, tamanho, quantidade, valorTotal } = data;

    return `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Seu Pedido - Kamisaria Zanuto</title>
  </head>
  <body style="margin:0; padding:0; background:#f6f6f6; font-family:Arial;">
  
    <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#f6f6f6">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" 
            style="background:#fff; border-radius:12px; margin-top:30px;
            box-shadow:0 4px 14px rgba(0,0,0,0.1); overflow:hidden;">
            
            <tr>
              <td style="background:#000; padding:30px; text-align:center; color:#fff;">
                <h1 style="margin:0; font-size:26px; letter-spacing:1px;">
                  Kamisaria Zanuto
                </h1>
                <p style="margin:5px 0 0; font-size:14px; color:#ccc;">
                  Excelência em Alfaiataria Masculina
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:30px;">
                <h2 style="margin:0; font-size:22px; color:#333;">
                  Seu pedido foi recebido! 🙌
                </h2>
                <p style="margin:8px 0 0; color:#555; font-size:15px;">
                  Olá <strong>${nome}</strong>, obrigado pela sua compra!  
                  Nossa equipe iniciará a produção da sua camisa sob medida.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 30px 30px 30px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td colspan="2" style="padding:12px 0; font-size:18px; border-bottom:2px solid #eee;">
                      <strong>Resumo do Pedido</strong>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:15px 0; width:70%; color:#333;">
                      <strong>${produto}</strong><br/>
                      <span style="color:#777; font-size:14px;">
                        Tamanho: ${tamanho} • Quantidade: ${quantidade}
                      </span>
                    </td>
                    <td align="right" style="color:#333; font-size:16px;">
                      <strong>R$ ${valorTotal}</strong>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="background:#000; padding:20px; text-align:center; color:#ccc; font-size:12px;">
                Kamisaria Zanuto • Alfaiataria Masculina Premium<br/>
                <a href="https://kamisariazanuto.com.br" style="color:#d4af37; text-decoration:none;">
                  kamisariazanuto.com.br
                </a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

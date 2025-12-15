export const gerarTemplatePedido = (data) => {
    const { nome, produto, tamanho, quantidade, valorUnitario, valorTotal } =
        data;

    return `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="utf-8" />
      <title>Kamisaria Zanuto - Pedido Confirmado</title>
    </head>

    <body style="margin:0; padding:0; background:#f6f6f6; font-family:Arial, Helvetica, sans-serif;">

      <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#f6f6f6">
        <tr>
          <td align="center">

            <table width="600" cellpadding="0" cellspacing="0" 
              style="background:#ffffff; border-radius:12px; overflow:hidden; 
              margin-top:30px; box-shadow:0 4px 14px rgba(0,0,0,0.1);">

              <tr>
                <td style="background:#000; padding:30px; text-align:center; color:#fff;">
                  <h1 style="margin:0; font-size:28px; letter-spacing:1px; text-transform:uppercase;">
                    Kamisaria Zanuto
                  </h1>
                  <p style="margin:5px 0 0; font-size:14px; color:#d1d1d1;">
                    Alfaiataria Sob Medida & Luxo Masculino
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:30px;">
                  <h2 style="margin:0; font-size:22px; color:#333;">
                    Pedido confirmado! ✨
                  </h2>
                  <p style="margin:10px 0 0; color:#555; font-size:15px;">
                    Olá <strong>${nome}</strong>, obrigado pela sua compra!
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
                          Tamanho: ${tamanho} – Quantidade: ${quantidade}
                        </span>
                      </td>
                      <td align="right" style="color:#333; font-size:16px;">
                        R$ ${valorUnitario}
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:20px 0; font-size:18px; color:#000; border-top:2px solid #eee;">
                        <strong>Total</strong>
                      </td>
                      <td align="right" style="padding:20px 0; font-size:18px; color:#000; border-top:2px solid #eee;">
                        <strong>R$ ${valorTotal}</strong>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:0 30px 30px 30px;">
                  <img src="https://i.imgur.com/8qYkRNO.jpeg"
                    alt="Kamisaria Zanuto - Camisa Sob Medida"
                    style="width:100%; border-radius:12px;" />
                </td>
              </tr>

              <tr>
                <td style="background:#000; padding:20px; text-align:center; color:#bbb; font-size:12px;">
                  Kamisaria Zanuto • Alfaiataria Premium Masculina<br/>
                  São Paulo – SP<br/>
                  <a href="https://kamisariazanuto.com.br" style="color:#d4af37; text-decoration:none;">kamisariazanuto.com.br</a>
                  <br/><br/>
                  <span style="color:#777;">© 2025 Kamisaria Zanuto. Todos os direitos reservados.</span>
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

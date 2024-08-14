
import { test, expect, chromium, afterEach,page} from '../Page/utils.spec.js';


test('inicioDoSite', async () => {
  

  await page.goto('http://uitestingplayground.com/home');
  const titulo = await page.title();
  expect(titulo).toBe('UI Test Automation Playground');

  const tituloInicio = await page.locator('.navbar-brand').textContent();
  expect(tituloInicio).toBe('UITAP');
  
  const titulo2 = await page.locator('#title').textContent();
  expect(titulo2).toBe('UI Test AutomationPlayground');

  const imagemVisivel = await page.locator('.img-fluid').isVisible();
  expect(imagemVisivel).toBe(true);

  
});

test('Alertas', async () => {

  page.on('dialog', async dialog => {
    console.log(`Mensagem do Alerta: ${dialog.message()}`);
    await dialog.accept(); 
  });

  await page.goto('http://uitestingplayground.com/alerts');
  await page.locator('#alertButton').click(); 

  page.on ('dialog1', async dialog => {
    console.log(`Mensagem do Alerta: ${dialog.message()}`);
   
    await dialog.dismiss();

    console.log(`Mensagem do Alerta: ${dialog.message() === 'No'}`);

  });
  await page.locator('#confirmButton').click(); 


  
});


test('ShadowDOM', async () => {
  await page.goto('http://uitestingplayground.com/shadowdom');

  await page.locator('#buttonGenerate').click();

  
  const shadowHost = await page.locator('guid-generator');
  const texto = await shadowHost.evaluate(el => el.shadowRoot.querySelector('#editField').value);

  await shadowHost.evaluate(el => el.shadowRoot.querySelector('#buttonCopy').click());
  expect(texto).toBe(texto); 
  
  // sem API Clipboard

});


test('imputTest', async () => {
  await page.goto('http://uitestingplayground.com/textinput');
  await page.locator('#newButtonName').click();
  await page.locator('#newButtonName').fill('Teste');
  await page.locator('#updatingButton').click();
  await page.locator('#updatingButton').getAttribute('value');
  expect (await page.locator('#updatingButton').textContent()).toBe('Teste');
});












import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {writeFileSync,readFileSync,renameSync} from 'node:fs';
import {experienceFixture} from '../experience-fixtures.cjs';
import {fixtureSession} from '../helpers/test-session.cjs';
const file=process.env.F2_FIXTURE_STATE!;
async function state(extra:Record<string,unknown>={}){writeFileSync(file+'.tmp',JSON.stringify({...experienceFixture(),...extra}));for(let n=0;;n++){try{renameSync(file+'.tmp',file);return;}catch(error){if(n>=25||(error as NodeJS.ErrnoException).code!=='EPERM')throw error;await new Promise(resolve=>setTimeout(resolve,20));}}}
test.beforeEach(async({context})=>{await state();await context.addCookies([{name:'besc-website-auth',value:fixtureSession(),domain:'127.0.0.1',path:'/',httpOnly:true,sameSite:'Lax'}]);});
test('seven groups, homepage order, same blog name and functional CMS subpages',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');await expect(page.getByRole('heading',{name:'Kies jouw ingang'})).toBeVisible();
 const nav=page.getByRole('navigation',{name:'Hoofdnavigatie'});for(const name of ['Over BESC','Creators','Esports & Gaming','Events','Community','Samenwerkingen','Media & Impact'])await expect(nav.getByRole('link',{name,exact:true})).toBeVisible();
 await nav.getByLabel('Submenu Media & Impact',{exact:true}).click();await expect(nav.getByRole('link',{name:'Nieuws & BESC-blog',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(nav.getByRole('link',{name:'Nieuws & BESC-blog',exact:true})).toBeHidden();
 await page.goto('/over-besc/team');await expect(page.getByRole('heading',{name:'TESTFIXTURE — team',exact:true})).toBeVisible();await expect(page.getByRole('navigation',{name:'Broodkruimels'})).toContainText('Over BESC');
 await page.goto('/fotoalbums');await expect(page.getByRole('link',{name:'TESTFIXTURE — fotoalbum-lokaal',exact:true})).toBeVisible();await page.goto('/fotoalbums/lokaal');await expect(page.getByRole('heading',{name:'TESTFIXTURE — fotoalbum-lokaal'})).toBeVisible();
 await page.goto('/nieuws');await expect(page.getByRole('heading',{name:'Nieuws & BESC-blog',exact:true})).toBeVisible();await page.getByRole('link',{name:'TESTFIXTURE — NIET PUBLICEREN — nieuws F2',exact:true}).click();await expect(page.locator('article.article')).toContainText('Gepubliceerd');
});
test('responsive widths and both themes retain readable home, accessible controls and no document overflow',async({page})=>{
 for(const width of [320,390,768,1280,1440]){await page.setViewportSize({width,height:1100});await page.goto('/');await expect(page.getByRole('heading',{name:'Binnenkort bij BESC'})).toBeVisible();for(const theme of ['light','dark']){await page.getByRole('combobox',{name:'Weergave',exact:true}).selectOption(theme);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();} }
 await page.screenshot({path:'test-results/website18-20-home-desktop-dark.png',fullPage:true});
 const violations=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations;expect(violations).toEqual([]);
 await page.setViewportSize({width:390,height:1000});await page.getByRole('combobox',{name:'Weergave',exact:true}).selectOption('light');await page.screenshot({path:'test-results/website18-20-home-mobile-light.png',fullPage:true});
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
});
test('mobile menu uses explicit controls and Escape returns focus to menu; search is real website search',async({page})=>{
 await page.setViewportSize({width:390,height:900});await page.goto('/');const button=page.getByRole('button',{name:'Menu',exact:true});await expect(button).toBeVisible();await button.click();await expect(page.getByRole('navigation',{name:'Hoofdnavigatie'})).toBeVisible();await page.keyboard.press('Escape');await expect(button).toBeFocused();await expect(page.getByRole('navigation',{name:'Hoofdnavigatie'})).toBeHidden();
 await page.getByRole('button',{name:'Zoeken',exact:true}).click();await page.getByRole('searchbox',{name:'Zoeken op de website'}).fill('creator');await page.getByRole('search').getByRole('button',{name:'Zoeken'}).click();await expect(page).toHaveURL(/\/zoeken\?q=creator/);await expect(page.locator('.search-results')).toContainText('TESTFIXTURE creator');expect(await page.locator('.search-results').textContent()).not.toContain('eigen aanvraag');
});
test('calendar, archive and creator filters retain canonical details and do not invent live badges',async({page})=>{
 await page.goto('/events?weergave=kalender');await expect(page.getByRole('region',{name:'Eventkalender'})).toBeVisible();await page.setViewportSize({width:390,height:1000});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();await expect(page.getByRole('link',{name:'TESTFIXTURE — NIET PUBLICEREN — event F2',exact:true})).toBeVisible();
 await page.goto('/events/archief');await expect(page.getByRole('heading',{name:'Voorbije events',exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:'TESTFIXTURE — historisch event'})).toBeVisible();
 await page.goto('/creators?platform=twitch');await expect(page.getByRole('heading',{name:'TESTFIXTURE creator'})).toBeVisible();await expect(page.getByRole('combobox',{name:'Platform'})).toHaveValue('twitch');expect(await page.locator('main').textContent()).not.toMatch(/offline|volgers|livebadge/i);
 await page.goto('/creators?platform=youtube');await expect(page.getByText('Er zijn momenteel geen beschikbare profielen voor deze selectie.')).toBeVisible();
 await page.goto('/creators/aanmelden');await expect(page.getByRole('heading',{name:'Creator aanmelden',exact:true})).toBeVisible();
});
test('Mijn BESC reuses own workflows, hides unconnected functions and no-JS personal data stays protected',async({page,browser})=>{
 await page.goto('/mijn-besc');await expect(page.getByRole('heading',{name:'Mijn BESC',exact:true})).toBeVisible();await expect(page.getByText('TESTFIXTURE eigen aanvraag',{exact:true})).toBeVisible();await expect(page.getByRole('link',{name:'Open mijn bestaande portaal',exact:true})).toHaveAttribute('href','/mijn-besc/portaal');const handoff=await page.request.get('/mijn-besc/portaal',{maxRedirects:0});expect(handoff.status()).toBe(303);expect(handoff.headers().location).toBe('https://cc-dev.belgianstreamerscommunity.be/portal');expect(handoff.headers()['referrer-policy']).toBe('no-referrer');
 for(const label of ['Mijn opdrachten','Mijn bestellingen','Mijn koppelingen'])await expect(page.getByRole('link',{name:label,exact:true})).toHaveCount(0);
 await page.getByRole('navigation',{name:'Mijn BESC',exact:true}).getByRole('link',{name:'Mijn profiel',exact:true}).click();await expect(page.getByRole('heading',{name:'Mijn creatorprofiel',exact:true})).toBeVisible();await expect(page.getByRole('textbox',{name:'Publieksnaam',exact:true})).toBeVisible();await expect(page.locator('input[name=accepted]')).not.toBeChecked();
 const context=await browser.newContext({javaScriptEnabled:false});await context.addCookies([{name:'besc-website-auth',value:fixtureSession(),domain:'127.0.0.1',path:'/',httpOnly:true,sameSite:'Lax'}]);const nojs=await context.newPage();await nojs.goto('http://127.0.0.1:3303/mijn-besc');await expect(nojs.locator('.account-overview')).toBeHidden();await context.close();
});
test('revocation removes homepage cards and navigation; own access revocation cannot restore stale private summaries',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{name:'TESTFIXTURE creator'})).toBeVisible();await state({revoked:true});await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await expect(page.getByRole('heading',{name:'TESTFIXTURE creator'})).toHaveCount(0);await expect(page.getByRole('heading',{name:'TESTFIXTURE — home',exact:true})).toHaveCount(0);
 await state();await page.goto('/mijn-besc');await expect(page.getByText('TESTFIXTURE eigen aanvraag',{exact:true})).toBeVisible();await state({ownRevoked:true});await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await expect(page.getByText('TESTFIXTURE eigen aanvraag',{exact:true})).toHaveCount(0);await expect(page.getByText('Je aanvragen konden niet worden gecontroleerd.')).toBeVisible();
});
test('source failure is distinct from empty and cleared account cannot access protected summary API',async({page,context})=>{
 await state({unavailable:true});await page.goto('/');await expect(page.getByText('De events zijn tijdelijk niet beschikbaar.')).toBeVisible();await expect(page.getByText('In het geladen overzicht staan geen komende events.')).toHaveCount(0);
 await state();await context.clearCookies();const response=await page.request.get('/api/website/account',{maxRedirects:0});expect([401,403,503]).toContain(response.status());expect(await response.text()).not.toContain('eigen aanvraag');await page.goto('/mijn-besc');await expect(page).toHaveURL(/\/login\?next=/);await expect(page.locator('input[name=next]').first()).toHaveValue('/mijn-besc');
});

test('navigation validation cannot reveal an own-profile screen while its own permission check waits',async({page})=>{
 await page.goto('/mijn-besc/profiel');await expect(page.getByRole('textbox',{name:'Publieksnaam',exact:true})).toBeVisible();
 await page.route('**/api/platform/me',async route=>{await new Promise(resolve=>setTimeout(resolve,700));await route.continue();});
 await state({ownRevoked:true});const navigation=page.waitForResponse(response=>response.url().endsWith('/api/website/navigation')&&response.ok());await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await navigation;
 await expect(page.getByRole('textbox',{name:'Publieksnaam',exact:true})).toBeHidden();await expect(page.getByRole('heading',{name:'Je eigen toegang wordt opnieuw gecontroleerd',exact:true})).toBeVisible();
});

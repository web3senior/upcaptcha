import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { ERC725 } from '@erc725/erc725.js'
import { CheckIcon, ChromeIcon, BraveIcon } from './components/icons'
import upcaptchaLogo from '/upcaptcha.svg'
import styles from './App.module.scss'
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json'

const provider = window.lukso
const web3 = new Web3(provider)

function App() {
  const [profile, setProfile] = useState(0)

  /**
   * Fetch Universal Profile
   */
  const fetchProfile = async (addr) => {
    const erc725js = new ERC725(lsp3ProfileSchema, addr,provider, {
      ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
    })
    return await erc725js.fetchData('LSP3Profile')
  }

  /**
   * Connect wallet
   */
  const connectWallet = async () => {
    await web3.eth.requestAccounts()
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    fetchProfile(accounts[0]).then(res =>{
      console.log(res)
      setProfile(res)
    })
  }

  useEffect(() => {})

  return (
    <>
      <div className={styles.container}>
        <CheckIcon />
        <h3>Verify You Are Human</h3>
        <p className={styles.description}>
          upCaptcha by using Universal Profile Public Data (UPPD) confirms visitors are real without the data privacy concerns or boring user experience of web2-CAPTCHAs.
        </p>
        <div className={styles.captcha}>
          <div className={styles.captcha__item}>
            <input type="checkbox" name="" id="" onClick={() => connectWallet()} />
          </div>
          <div className={styles.captcha__item}>I’m an UP user</div>
          <div className={styles.captcha__item}>
            <a href="./" target="_blank">
              <img src={upcaptchaLogo} className="logo react" alt="React logo" />
            </a>
            <b>upCaptcha</b>
            <div className={styles.captcha__itemActions}>
              <a href="./" target="_blank">
                Privacy
              </a>
              <a href="./" target="_blank">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.UPextension}>
        Install UP extension
        <a href="https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn" target="_blank">
          <ChromeIcon />
        </a>
        <a href="https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn" target="_blank">
          <BraveIcon />
        </a>
      </div>
    </>
  )
}

export default App

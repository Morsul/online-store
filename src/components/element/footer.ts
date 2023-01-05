import { elementGenerator } from '../controller/taggenerator';
import '../assets/svg/rss.svg';
export class Footer {
  createFooter(): DocumentFragment {
    const fragment = new DocumentFragment();
    const blockLink: HTMLDivElement = elementGenerator.createDiv({ className: 'footer-links' });
    const linkRSS: HTMLAnchorElement = elementGenerator.createLink('https://rs.school/js/', {});
    const rsSchool: HTMLImageElement = elementGenerator.createImg('https://rs.school/images/rs_school_js.svg', {
      alt: 'RSS',
      className: 'logo-rss',
    });
    linkRSS.append(rsSchool);
    const linkGitHubFirst: HTMLAnchorElement = elementGenerator.createLink('https://github.com/tuto4ki', {});
    const pictureGitHubFirst: HTMLDivElement = elementGenerator.createDiv({ className: 'gitHubBg' });
    linkGitHubFirst.append(pictureGitHubFirst);
    const linkGitHubSecond: HTMLAnchorElement = elementGenerator.createLink('https://github.com/Morsul', {});
    const pictureGitHubSecond: HTMLDivElement = elementGenerator.createDiv({ className: 'gitHubBg' });
    linkGitHubSecond.append(pictureGitHubSecond);

    const title: HTMLParagraphElement = elementGenerator.createParagraph({
      text: 'Online store 2023',
      className: 'title',
    });

    const footer = elementGenerator.createHTMLElement('footer', {});
    blockLink.append(linkGitHubFirst, linkRSS, linkGitHubSecond);
    footer.append(blockLink, title);
    fragment.append(footer);
    return fragment;
  }
}

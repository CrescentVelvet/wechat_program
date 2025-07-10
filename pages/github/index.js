Page({
  data: {
    languages: ['All', 'JavaScript', 'Python', 'Go', 'TypeScript'],
    currentLang: 'All',
    repos: [],
    loading: false
  },
  onLoad() {
    this.fetchTrending();
  },
  onLangChange(e) {
    const lang = this.data.languages[e.detail.value];
    this.setData({ currentLang: lang });
    this.fetchTrending(lang);
  },
  fetchTrending(lang = 'All') {
    this.setData({ loading: true });
    const that = this;
    let url = 'https://trend.doforce.dpdns.org?since=weekly';
    if (lang && lang !== 'All') {
      url += `&language=${lang}`;
    }
    wx.request({
      url,
      success(res) {
        that.setData({ repos: res.data, loading: false });
      },
      fail() {
        that.setData({ repos: [], loading: false });
        wx.showToast({ title: '获取失败', icon: 'none' });
      }
    });
  }
}); 
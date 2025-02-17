import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        windows = document.querySelectorAll('[data-modal]');
  checkNumInputs('input[name="user_phone"]')

  const message = {
    loading: 'Завантаження...',
    succes: "Дякуємо! Скоро з вами зв'яжуться",
    failure: 'Щось пішло не так'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;

    let res = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await res.text();

  };

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  };

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);
      if(item.getAttribute('data-calc') === "end") {
        for(let key in state) {
          formData.append(key, state[key]);
        }
      }
      postData('assets/server.php', formData)
          .then(res => {
            console.log(res);
            statusMessage.textContent = message.succes;
          })
          .catch(() => statusMessage.textContent = message.failure)
          .finally(() => {
            clearInputs();
            for (let key in state) {
              delete state[key];
            };
            setTimeout(() => {
              statusMessage.remove();
              windows.forEach(item => {
                item.style.display = 'none';
              });
            }, 2000);
          });
    });
  });

};

export default forms;
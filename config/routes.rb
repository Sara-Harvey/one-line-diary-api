Rails.application.routes.draw do
  
  resources :types, only: [:index, :show, :update, :create, :destroy]
  resources :entries, only: [:index, :show, :update, :create, :destroy]
  
  # check out notes on namespacing routes
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

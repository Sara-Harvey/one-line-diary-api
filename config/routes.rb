Rails.application.routes.draw do
  
  resources :types, only: [:index]
  resources :entries#, only: [:index, :show, :update, :create]
  
end

class TypeSerializer < ActiveModel::Serializer
  has_many :entries

  attributes :name
end

class EntriesController < ApplicationController

	def index
	  entries = Entry.all
	  render json: entries
	end

	def show
		entry = Entry.find(params[:id])
		render json: entry 
	end

	def create
	  entry = Entry.new(entry_params)
	  entry.save 
	end

	def destroy
		entry = Entry.find(params:id)
		entry.destroy
		render json: ("Your entry was deleted.").to_json
	end

    private

      def entry_params
        params.require(:entry).permit(:date, :content)
      end

end